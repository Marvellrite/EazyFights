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

  @Prop({ required: true })
  emailAddress: string;

  // Address Information
  @Prop({ required: true })
  streetAddress: string;

  @Prop({ required: true })
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
  @Prop({ required: true, enum: ['Yes', 'No'] })
  hasPreExistingConditions: string;

  @Prop()
  medicalConditionsDetails: string;

  @Prop({ required: true, enum: ['Yes', 'No'] })
  takingMedications: string;

  @Prop()
  medicationsDetails: string;

  @Prop({ required: true, enum: ['Yes', 'No'] })
  hadSurgeries: string;

  @Prop()
  surgeriesDetails: string;

  // Training Goals
  @Prop({ required: true })
  primaryGoal: string;

  @Prop()
  otherGoalDetails: string;

  @Prop({ enum: ['None', 'Beginner', 'Intermediate'], default: 'None' })
  martialArtsExperience: string;

  // Liability Waiver
  @Prop({ required: true, type: Boolean })
  agreeToWaiver: boolean;
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);
