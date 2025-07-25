import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

enum MartialArtsExperience {
  None = 'none',
  Beginner = 'beginner',
  Intermediate = 'intermediate',
}

export class RegistrationDto {
  // Personal Information
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  registrationDate: Date;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  contactNumber: string;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  // Address Information
  @IsNotEmpty()
  @IsString()
  streetAddress: string;

  @IsNotEmpty()
  @IsString()
  cityTown: string;

  @IsNotEmpty()
  @IsString()
  stateProvince: string;

  // Emergency Contact Information
  @IsNotEmpty()
  @IsString()
  emergencyContactName: string;

  @IsNotEmpty()
  @IsString()
  relationship: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  emergencyPhoneNumber: string;

  // Health Information
  @IsEnum(['yes', 'no'])
  @IsNotEmpty()
  hasPreExistingConditions: string;

  @IsString()
  medicalConditionsDetails: string;

  @IsNotEmpty()
  @IsEnum(['yes', 'no'])
  takingMedications: string;

  @IsString()
  medicationsDetails: string;

  @IsNotEmpty()
  @IsEnum(['yes', 'no'])
  hadSurgeries: string;

  @IsString()
  surgeriesDetails: string;

  // Training Goals
  @IsNotEmpty()
  @IsString()
  primaryGoal: string;

  @IsString()
  otherGoalDetails: string;

  @IsEnum(MartialArtsExperience)
  martialArtsExperience: MartialArtsExperience;

  // Liability Waiver
  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  agreeToWaiver: boolean;

  // File upload fields - these will be set by the controller after upload
  // Remove validation here since they're handled separately
  passportPhoto?: string;
  publicId?: string;
}

export class TestDto{
  name: string
}