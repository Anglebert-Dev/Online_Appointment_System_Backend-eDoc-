import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  title: string;
  
  @ApiProperty()
  @IsString()
  doctorId: string;
  
  @ApiProperty()
  @IsOptional()
  @IsDate()
  date: Date;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  startTime: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  endTime: string;
  
  @IsArray()
  patients: string[];

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  maxPatients: number;
}
