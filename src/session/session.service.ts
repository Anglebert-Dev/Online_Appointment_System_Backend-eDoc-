import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionService {
  
  constructor(private readonly prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto) {
    return this.prisma.session.create({ data: createSessionDto });
  }

  findAll() {
    return this.prisma.session.findMany({
      where: {
        date: { gte: new Date() },
        patients: { none: {} },
      },
    });
  }

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
