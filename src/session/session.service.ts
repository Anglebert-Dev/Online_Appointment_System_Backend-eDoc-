import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Session } from '@prisma/client';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto) {
    const isoDate = new Date(createSessionDto.date).toISOString();

    return this.prisma.session.create({
      data: {
        title: createSessionDto.title,
        doctorId: createSessionDto.doctorId,
        // patients:createSessionDto.patients,
        date: isoDate,
        startTime: createSessionDto.startTime,
        endTime: createSessionDto.endTime,
        maxPatients: createSessionDto.maxPatients,
      },
    });
  }

  findAll() {
    return this.prisma.session.findMany({
      include:{patients:true}
    })
  }

  // async findAllAvailableSessions(): Promise<Session[]> {
  //   const currentDate = new Date();
  //   const availableSessions = await this.prisma.session.findMany({
  //     where: {
  //       date: { gte: currentDate },
  //       // patients: {
  //       //   none: {},
  //       // },
  //     },
  //     // include: { patients: true },
  //   });

  //   // const filteredSessions = availableSessions.filter(
  //   //   (session) => session.patients.length < session.maxPatients,
  //   // );

  //   // return filteredSessions;
  //   return availableSessions
  // }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
