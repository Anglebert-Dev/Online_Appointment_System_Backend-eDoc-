import { ApiProperty } from '@nestjs/swagger';
import {  IsString } from 'class-validator';

export class CreateAppointmentDto {
    @ApiProperty()
    @IsString()
    patientId: string;
  
    @ApiProperty()
    @IsString()
    sessionId: string;

    @IsString()
    status: string = 'PENDING';
}
