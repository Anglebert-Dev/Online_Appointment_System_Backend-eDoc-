import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/jwt-auth-guard/role.guard';

import { Role } from '../auth/jwt-auth-guard/role.enum';
import { Roles } from 'src/auth/jwt-auth-guard/roles.decorator';

@ApiTags("patient")
@Controller('patient')
export class PatientController {
  constructor(private readonly userService: PatientService) {}

  @Post('register')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.userService.create(createPatientDto);
  }

  @Get()
  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.userService.update(id, updatePatientDto);
  }

  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin , Role.Patient)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

