import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuardService } from './jwt-auth-guard/jwt-auth-guard.service';
import { DoctorModule } from './doctor/doctor.module';
import { SessionModule } from './session/session.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [PrismaModule,PatientModule, AuthModule, DoctorModule, SessionModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuardService],
})
export class AppModule {}
