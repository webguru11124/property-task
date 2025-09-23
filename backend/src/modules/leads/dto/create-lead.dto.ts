import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  phone!: string;

  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsUUID()
  cityId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;
}
