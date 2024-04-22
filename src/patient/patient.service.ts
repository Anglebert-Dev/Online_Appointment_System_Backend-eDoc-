import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/jwt-auth-guard/role.enum';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prisma.patient.findUnique({
      where: { email },
    });
  }

  async create(createPatientDto: CreatePatientDto) {
    // Check if email exists
    const existingUser = await this.findOneByEmail(createPatientDto.email);
    if (existingUser) {
      throw new ConflictException('Email is already taken');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createPatientDto.password, 10);

    // Save the patient
    return this.prisma.patient.create({
      data: {
        username: createPatientDto.username,
        email: createPatientDto.email,
        phone: createPatientDto.phone,
        role: createPatientDto.role || Role.Patient,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      include: {
        appointments: true,
        Session:true
      },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });
    if (!patient) {
      throw new NotFoundException('User not found');
    }
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const userData: any = { ...updatePatientDto };

    // Hash the password if it's provided in the update DTO
    if (updatePatientDto.password) {
      userData.password = await bcrypt.hash(updatePatientDto.password, 10);
    }

    return this.prisma.patient.update({
      where: { id },
      data: userData,
    });
  }

  async remove(id: string) {
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
