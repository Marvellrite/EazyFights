import { IsNotEmpty, IsString, IsDate, IsEmail, IsPhoneNumber, IsEnum } from "class-validator";


export class RegistrationDto {
   // Personal Information
    @IsNotEmpty()
    @IsString()
   fullName: string;

    @IsNotEmpty()
    @IsDate()
   dateOfBirth: string;

   @IsNotEmpty()
   @IsString()
   gender: string

    @IsNotEmpty()
   @IsString()
   nationality: string

   @IsNotEmpty()
   @IsPhoneNumber()
   contactNumber: string

    @IsNotEmpty()
    @IsEmail()
   emailAddress: string
 
   // Address Information

   @IsNotEmpty()
   @IsString()
   streetAddress: string

   @IsNotEmpty()
   @IsString()
   cityTown: string

   @IsNotEmpty()
   @IsString()
   stateProvince: string
 
   // Emergency Contact Information
    @IsNotEmpty()
    @IsString()
   emergencyContactName: string

   @IsNotEmpty()
   @IsString()
   relationship: string

    @IsNotEmpty()
    @IsPhoneNumber()
   emergencyPhoneNumber: string
 
   // Health Information

    @IsEnum(['Yes', 'No'])
    @IsNotEmpty()
   hasPreExistingConditions: string

   @IsString()
   medicalConditionsDetails: string

    @IsNotEmpty()
    @IsEnum(['Yes', 'No'])
   takingMedications: string

    @IsString()
   medicationsDetails: string

    @IsNotEmpty()
    @IsEnum(['Yes', 'No'])
   hadSurgeries: string

    @IsString()
   surgeriesDetails: string
 
   // Training Goals
   @IsNotEmpty()
    @IsString()
    primaryGoal: string

    @IsString()
   otherGoalDetails: string

   @IsEnum(['None', 'Beginner', 'Intermediate'])
   martialArtsExperience: string
 
   // Liability Waiver
   @IsNotEmpty()
   @IsEnum([true, false])
   agreeToWaiver: boolean
}
