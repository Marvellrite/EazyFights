import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistrationDocument = Registration & Document;

@Schema()
export class Registration {
  // Personal Information
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
  contactNumber: string;

  @Prop({ required: true, unique:true })
  emailAddress: string;

  // Address Information
  @Prop({ required: true })
  streetAddress: string;

  @Prop({ required: true, sparse: true })
  cityTown: string;

  @Prop({ required: true })
  stateProvince: string;

  // Emergency Contact Information
  @Prop({ required: true })
  emergencyContactName: string;

  @Prop({ required: true })
  relationship: string;

  @Prop({ required: true })
  emergencyPhoneNumber: string;

  // Health Information
  @Prop({ required: true, enum: ['yes', 'no'] })
  hasPreExistingConditions: string;

  @Prop()
  medicalConditionsDetails: string;

  @Prop({ required: true, enum: ['yes', 'no'] })
  takingMedications: string;

  @Prop()
  medicationsDetails: string;

  @Prop({ required: true, enum: ['yes', 'no'] })
  hadSurgeries: string;

  @Prop()
  surgeriesDetails: string;

  // Training Goals
  @Prop({ required: true })
  primaryGoal: string;

  @Prop()
  otherGoalDetails: string;

  @Prop({ enum: ['none', 'beginner', 'intermediate'], default: 'none' })
  martialArtsExperience: string;

  // Liability Waiver
  @Prop({ required: true, type: Boolean })
  agreeToWaiver: boolean;

  // Passport photo imageurl
  @Prop({ required: true, type: String })
  passportPhoto: string;

  // Passport photo publicId
  @Prop({ required: true, type: String })
  publicId: string;


  // Registration Date
  @Prop({ required: true, type: String })
  registrationDate: string;
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);
