import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateSessionDto {
    @ApiProperty()
    @IsString()
    title: string;
    @ApiProperty()
    @IsString()
    doctorId: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    date: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    startTime: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    endTime: string;
    @IsArray()
    patients:string[];
    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    maxPatients: number;
}
