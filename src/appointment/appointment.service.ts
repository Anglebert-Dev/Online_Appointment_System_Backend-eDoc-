import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from '@prisma/client';
import { Status } from './status.enum';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const session = await this.prisma.session.findUnique({
      where: { id: createAppointmentDto.sessionId },
      include: { patients: true },
    });

    if (!session) {
      throw new Error('Session not found');
    }
    const { date, startTime, endTime } = session;

    if (session.patients.length >= session.maxPatients) {
      throw new Error('Session is already fully booked');
    }
    const appointmentNumber = (session.patients.length + 1).toString();

   const appointment = await this.prisma.appointment.create({
      data: {
        patientId: createAppointmentDto.patientId,
        sessionId: createAppointmentDto.sessionId,
        appointmentNumber: appointmentNumber,
        date: session.date,
        startTime: session.startTime,
        endTime: session.endTime,
        status: createAppointmentDto.status || Status.Pending,
      },
    });

    const updatedSession = await this.prisma.session.update({
      where: { id: createAppointmentDto.sessionId },
      data: { patients: { connect: { id: createAppointmentDto.patientId } } },
    });

    return appointment
  }

  findAll() {
    return this.prisma.appointment.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
