export interface Student {
  _id: string
  registrationDate: string
  passportPhoto?: string // Base64 encoded image or URL
  fullName: string
  dateOfBirth: string
  gender: string
  nationality: string
  contactNumber: string
  emailAddress: string
  streetAddress: string
  cityTown: string
  stateProvince: string
  emergencyContactName: string
  relationship: string
  emergencyPhoneNumber: string
  hasPreExistingConditions: string
  medicalConditionsDetails: string
  takingMedications: string
  medicationsDetails: string
  hadSurgeries: string
  surgeriesDetails: string
  primaryGoal: string
  otherGoalDetails: string
  martialArtsExperience: string
  agreeToWaiver: boolean
}
