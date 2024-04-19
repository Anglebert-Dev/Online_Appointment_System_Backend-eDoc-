import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { Doctor, Patient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Patient | Doctor> {
    let user: Patient | Doctor | null = await this.prisma.patient.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.doctor.findUnique({
        where: { email },
      });
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new NotFoundException('Wrong Credentials!');
    }

    // Remove 'sessionId' from the returned user object if it's a doctor
    if ('sessionId' in user) {
      const { sessionId, ...userData } = user;
      return { ...userData, specialties: [] };
    }

    // If user is a patient, return as is
    return user;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
