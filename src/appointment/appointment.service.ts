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
    // Extract date, startTime, and endTime from the session
    const { date, startTime, endTime } = session;

    // Determine the appointment number based on the number of appointments already booked
    const appointmentNumber = (session.patients.length + 1).toString();

    return this.prisma.appointment.create({
      data: {
        patientId: createAppointmentDto.patientId,
        sessionId: createAppointmentDto.sessionId,
        appointmentNumber: appointmentNumber,
        // Use the date, startTime, and endTime from the session
        date: session.date,
        startTime: session.startTime,
        endTime: session.endTime,
        // Set the status from the DTO
        status: createAppointmentDto.status || Status.Pending,
      },
    });
  }

  findAll() {
    return `This action returns all appointment`;
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
