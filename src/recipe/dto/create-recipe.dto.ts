import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
  @ApiProperty()
  @IsString()
  ingredients: string;
  @ApiProperty()
  @IsString()
  instructions: string;
}
