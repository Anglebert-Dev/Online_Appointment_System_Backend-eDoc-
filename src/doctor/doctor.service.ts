import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/jwt-auth-guard/role.enum';
import * as bcrypt from 'bcrypt';
import { Doctor } from '@prisma/client';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prisma.doctor.findUnique({
      where: { email },
    });
  }

  async create(createDoctorDto: CreateDoctorDto) {
    console.log(createDoctorDto.email);
    const existingdoctor = await this.findOneByEmail(createDoctorDto.email);

    if (existingdoctor) {
      throw new ConflictException('email is already taken');
    }

    const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);

    return this.prisma.doctor.create({
      data: {
        username: createDoctorDto.username,
        email: createDoctorDto.email,
        phone: createDoctorDto.phone,
        specialties: createDoctorDto.specialties, 
        role: createDoctorDto.role || Role.Doctor,
        password: hashedPassword,

      },
    });
  }

  async findAll(): Promise<Doctor[]> {
    return this.prisma.doctor.findMany({
      include: {
        sessions: true,
      },
    });
  }
  

  async findOne(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
    });
    if (!doctor) {
      throw new NotFoundException('doctor not found');
    }
    return doctor;
  }

  async update(id: string, updatedoctorDto: UpdateDoctorDto) {
    const doctorData: any = { ...updatedoctorDto };

    if (updatedoctorDto.password) {
      doctorData.password = await bcrypt.hash(updatedoctorDto.password, 10);
    }

    return this.prisma.doctor.update({
      where: { id },
      data: doctorData,
    });
  }

  async remove(id: string) {
    return this.prisma.doctor.delete({
      where: { id },
    });
  }
}
