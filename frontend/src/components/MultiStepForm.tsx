"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, User, MapPin, Phone, Heart, Target, FileText } from "lucide-react"
import { formatToInternational } from "../lib/utils";

interface FormData {
  // Personal Information
  fullName: string
  dateOfBirth: string
  gender: string
  nationality: string
  contactNumber: string
  emailAddress: string

  // Address Information
  streetAddress: string
  cityTown: string
  stateProvince: string

  // Emergency Contact Information
  emergencyContactName: string
  relationship: string
  emergencyPhoneNumber: string

  // Health Information
  hasPreExistingConditions: string,
  medicalConditionsDetails: string
  takingMedications: string
  medicationsDetails: string
  hadSurgeries: string
  surgeriesDetails: string

  // Training Goals
  primaryGoal: string
  otherGoalDetails: string
  martialArtsExperience: string

  // Liability Waiver
  agreeToWaiver: boolean
}

const server_url='https://eazyfights.onrender.com/Registration'

const steps = [
  {
    id: 1,
    title: "Personal Information",
    description: "Basic personal details",
    icon: User,
  },
  {
    id: 2,
    title: "Address Information",
    description: "Your location details",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Emergency Contact",
    description: "Emergency contact person",
    icon: Phone,
  },
  {
    id: 4,
    title: "Health Information",
    description: "Medical history and conditions",
    icon: Heart,
  },
  {
    id: 5,
    title: "Training Goals",
    description: "Your martial arts objectives",
    icon: Target,
  },
  {
    id: 6,
    title: "Liability Waiver",
    description: "Agreement and final submission",
    icon: FileText,
  },
]

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    contactNumber: "",
    emailAddress: "",
    streetAddress: "",
    cityTown: "",
    stateProvince: "",
    emergencyContactName: "",
    relationship: "",
    emergencyPhoneNumber: "",
    hasPreExistingConditions: "",
    medicalConditionsDetails: "",
    takingMedications: "",
    medicationsDetails: "",
    hadSurgeries: "",
    surgeriesDetails: "",
    primaryGoal: "",
    otherGoalDetails: "",
    martialArtsExperience: "",
    agreeToWaiver: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.fullName) newErrors.fullName = "Full name is required"
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
        if (!formData.gender) newErrors.gender = "Gender is required"
        if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required"
        if (!formData.emailAddress) newErrors.emailAddress = "Email address is required"
        break
      case 2:
        if (!formData.streetAddress) newErrors.streetAddress = "Street address is required"
        if (!formData.cityTown) newErrors.cityTown = "City/Town is required"
        if (!formData.stateProvince) newErrors.stateProvince = "State/Province is required"
        break
      case 3:
        if (!formData.emergencyContactName) newErrors.emergencyContactName = "Emergency contact name is required"
        if (!formData.relationship) newErrors.relationship = "Relationship is required"
        if (!formData.emergencyPhoneNumber) newErrors.emergencyPhoneNumber = "Emergency phone number is required"
        break
      case 4:
        if (!formData.hasPreExistingConditions) newErrors.hasPreExistingConditions = "Please select an option"
        if (!formData.takingMedications) newErrors.takingMedications = "Please select an option"
        if (!formData.hadSurgeries) newErrors.hadSurgeries = "Please select an option"
        break
      case 5:
        if (!formData.primaryGoal) newErrors.primaryGoal = "Please select your primary goal"
        if (!formData.martialArtsExperience) newErrors.martialArtsExperience = "Please select your experience level"
        break
      case 6:
        if (!formData.agreeToWaiver) newErrors.agreeToWaiver = "You must agree to the liability waiver"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async() => {
    if (validateStep(currentStep)) {
      console.log("Form Data:", formData);
      let tempFormData = { ...formData, contactNumber: formatToInternational(formData.contactNumber), emergencyPhoneNumber: formatToInternational(formData.emergencyPhoneNumber) }
      const mFormData = new FormData();
      (Object.keys(tempFormData)as (keyof FormData)[]).forEach((key)=>{
        mFormData.append(key, tempFormData[key].toString())
      })
      try {
        console.log(server_url)
        
        const response = await fetch(server_url, {
          method: "POST",
          body: mFormData,
        }
      );
      if (!response.ok) {
          throw new Error("Form Not Submitted Successfully");
      };
      const data = await response.json();
      console.log("Registration successful:", data);
      alert("Registration submitted successfully! Welcome to EazyFights! 🥊");

      } catch (error) {
        console.error("Error submitting Registration:", error);
        alert("There was an error submitting your Registration. Please try again later.")
        return;
      }
      
      
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Organization Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-600 text-white p-3 rounded-full mr-4">
              <span className="text-2xl">🥊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-red-800">EazyFights</h1>
              <p className="text-lg text-red-600 font-medium">The Self Defense Academy</p>
              <p className="text-sm text-gray-600">Student Registration Form</p>
            </div>
          </div>
        </div>

        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Registration Process</h2>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          <Progress value={progress} className="mb-6" />

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const Icon = step.icon
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id

              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 ${
                      isCompleted
                        ? "bg-red-500 border-red-500 text-white"
                        : isCurrent
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-xs font-medium ${
                        isCurrent ? "text-orange-600" : isCompleted ? "text-red-600" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 hidden sm:block">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <CardTitle className="text-white">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-red-100">{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    className={errors.dateOfBirth ? "border-red-500" : ""}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <Label className="text-base font-medium">Gender *</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => updateFormData("gender", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => updateFormData("nationality", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => updateFormData("contactNumber", e.target.value)}
                    className={errors.contactNumber ? "border-red-500" : ""}
                  />
                  {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
                </div>
                <div>
                  <Label htmlFor="emailAddress">Email Address *</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => updateFormData("emailAddress", e.target.value)}
                    className={errors.emailAddress ? "border-red-500" : ""}
                  />
                  {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Address Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="streetAddress">Street Address *</Label>
                  <Input
                    id="streetAddress"
                    value={formData.streetAddress}
                    onChange={(e) => updateFormData("streetAddress", e.target.value)}
                    className={errors.streetAddress ? "border-red-500" : ""}
                  />
                  {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
                </div>
                <div>
                  <Label htmlFor="cityTown">City/Town *</Label>
                  <Input
                    id="cityTown"
                    value={formData.cityTown}
                    onChange={(e) => updateFormData("cityTown", e.target.value)}
                    className={errors.cityTown ? "border-red-500" : ""}
                  />
                  {errors.cityTown && <p className="text-red-500 text-sm mt-1">{errors.cityTown}</p>}
                </div>
                <div>
                  <Label htmlFor="stateProvince">State/Province *</Label>
                  <Input
                    id="stateProvince"
                    value={formData.stateProvince}
                    onChange={(e) => updateFormData("stateProvince", e.target.value)}
                    className={errors.stateProvince ? "border-red-500" : ""}
                  />
                  {errors.stateProvince && <p className="text-red-500 text-sm mt-1">{errors.stateProvince}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Emergency Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) => updateFormData("emergencyContactName", e.target.value)}
                    className={errors.emergencyContactName ? "border-red-500" : ""}
                  />
                  {errors.emergencyContactName && (
                    <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="relationship">Relationship *</Label>
                  <Input
                    id="relationship"
                    placeholder="e.g., Parent, Spouse, Sibling"
                    value={formData.relationship}
                    onChange={(e) => updateFormData("relationship", e.target.value)}
                    className={errors.relationship ? "border-red-500" : ""}
                  />
                  {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>}
                </div>
                <div>
                  <Label htmlFor="emergencyPhoneNumber">Phone Number *</Label>
                  <Input
                    id="emergencyPhoneNumber"
                    type="tel"
                    value={formData.emergencyPhoneNumber}
                    onChange={(e) => updateFormData("emergencyPhoneNumber", e.target.value)}
                    className={errors.emergencyPhoneNumber ? "border-red-500" : ""}
                  />
                  {errors.emergencyPhoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.emergencyPhoneNumber}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Health Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">
                    Do you have any pre-existing medical conditions or injuries? *
                  </Label>
                  <RadioGroup
                    value={formData.hasPreExistingConditions}
                    onValueChange={(value) => updateFormData("hasPreExistingConditions", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="conditions-yes" />
                      <Label htmlFor="conditions-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="conditions-no" />
                      <Label htmlFor="conditions-no">No</Label>
                    </div>
                  </RadioGroup>
                  {errors.hasPreExistingConditions && (
                    <p className="text-red-500 text-sm mt-1">{errors.hasPreExistingConditions}</p>
                  )}
                </div>

                {formData.hasPreExistingConditions === "yes" && (
                  <div>
                    <Label htmlFor="medicalConditionsDetails">If Yes, please provide details:</Label>
                    <Textarea
                      id="medicalConditionsDetails"
                      placeholder="Please describe your medical conditions or injuries..."
                      value={formData.medicalConditionsDetails}
                      onChange={(e) => updateFormData("medicalConditionsDetails", e.target.value)}
                      rows={3}
                    />
                  </div>
                )}

                <div>
                  <Label className="text-base font-medium">Are you currently taking any medications? *</Label>
                  <RadioGroup
                    value={formData.takingMedications}
                    onValueChange={(value) => updateFormData("takingMedications", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="medications-yes" />
                      <Label htmlFor="medications-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="medications-no" />
                      <Label htmlFor="medications-no">No</Label>
                    </div>
                  </RadioGroup>
                  {errors.takingMedications && <p className="text-red-500 text-sm mt-1">{errors.takingMedications}</p>}
                </div>

                {formData.takingMedications === "yes" && (
                  <div>
                    <Label htmlFor="medicationsDetails">If Yes, please specify:</Label>
                    <Textarea
                      id="medicationsDetails"
                      placeholder="Please list your current medications..."
                      value={formData.medicationsDetails}
                      onChange={(e) => updateFormData("medicationsDetails", e.target.value)}
                      rows={3}
                    />
                  </div>
                )}

                <div>
                  <Label className="text-base font-medium">Have you had any surgeries in the past 12 months? *</Label>
                  <RadioGroup
                    value={formData.hadSurgeries}
                    onValueChange={(value) => updateFormData("hadSurgeries", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="surgeries-yes" />
                      <Label htmlFor="surgeries-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="surgeries-no" />
                      <Label htmlFor="surgeries-no">No</Label>
                    </div>
                  </RadioGroup>
                  {errors.hadSurgeries && <p className="text-red-500 text-sm mt-1">{errors.hadSurgeries}</p>}
                </div>

                {formData.hadSurgeries === "yes" && (
                  <div>
                    <Label htmlFor="surgeriesDetails">If Yes, please specify:</Label>
                    <Textarea
                      id="surgeriesDetails"
                      placeholder="Please describe your recent surgeries..."
                      value={formData.surgeriesDetails}
                      onChange={(e) => updateFormData("surgeriesDetails", e.target.value)}
                      rows={3}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Training Goals */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">What is your primary goal for joining the program? *</Label>
                  <RadioGroup
                    value={formData.primaryGoal}
                    onValueChange={(value) => updateFormData("primaryGoal", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fitness" id="goal-fitness" />
                      <Label htmlFor="goal-fitness">Fitness</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="self-defense" id="goal-self-defense" />
                      <Label htmlFor="goal-self-defense">Self-defense</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weight-loss" id="goal-weight-loss" />
                      <Label htmlFor="goal-weight-loss">Weight Loss</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="goal-other" />
                      <Label htmlFor="goal-other">Other</Label>
                    </div>
                  </RadioGroup>
                  {errors.primaryGoal && <p className="text-red-500 text-sm mt-1">{errors.primaryGoal}</p>}
                </div>

                {formData.primaryGoal === "other" && (
                  <div>
                    <Label htmlFor="otherGoalDetails">Please specify your other goal:</Label>
                    <Input
                      id="otherGoalDetails"
                      placeholder="Describe your training goal..."
                      value={formData.otherGoalDetails}
                      onChange={(e) => updateFormData("otherGoalDetails", e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <Label className="text-base font-medium">Previous Martial Arts Experience (if any) *</Label>
                  <RadioGroup
                    value={formData.martialArtsExperience}
                    onValueChange={(value) => updateFormData("martialArtsExperience", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="exp-none" />
                      <Label htmlFor="exp-none">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="exp-beginner" />
                      <Label htmlFor="exp-beginner">Beginner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="exp-intermediate" />
                      <Label htmlFor="exp-intermediate">Intermediate</Label>
                    </div>
                  </RadioGroup>
                  {errors.martialArtsExperience && (
                    <p className="text-red-500 text-sm mt-1">{errors.martialArtsExperience}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 6: Liability Waiver and Agreement */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-700">Review Your Information</h3>
                  <div className="bg-red-50 p-4 rounded-lg space-y-2 text-sm border border-red-200">
                    <p>
                      <strong>Name:</strong> {formData.fullName}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.emailAddress}
                    </p>
                    <p>
                      <strong>Phone:</strong> {formData.contactNumber}
                    </p>
                    <p>
                      <strong>Address:</strong> {formData.streetAddress}, {formData.cityTown}, {formData.stateProvince}
                    </p>
                    <p>
                      <strong>Emergency Contact:</strong> {formData.emergencyContactName} ({formData.relationship})
                    </p>
                    <p>
                      <strong>Primary Goal:</strong> {formData.primaryGoal}
                    </p>
                    <p>
                      <strong>Experience Level:</strong> {formData.martialArtsExperience}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-red-700">Liability Waiver and Agreement</h3>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-48 overflow-y-auto text-sm border">
                    <p className="mb-4 font-medium text-gray-800">
                      I, the undersigned, understand that participation in martial arts training can involve physical
                      contact and strenuous physical activity. I accept full responsibility for any risk of injury and
                      agree to release the organization and its instructors from any liability for personal injuries or
                      damage that may occur during my training.
                    </p>
                    <p className="mb-4">
                      I confirm that all information provided is accurate to the best of my knowledge and agree to abide
                      by the academy's rules and regulations.
                    </p>
                    <p className="text-red-700 font-medium">
                      By checking the box below, you acknowledge that you have read, understood, and agree to this
                      liability waiver and all terms stated above.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToWaiver"
                        checked={formData.agreeToWaiver}
                        onCheckedChange={(checked) => updateFormData("agreeToWaiver", checked)}
                        className={errors.agreeToWaiver ? "border-red-500" : ""}
                      />
                      <Label htmlFor="agreeToWaiver" className="text-sm leading-5">
                        I agree to the <span className="text-red-600 font-medium">Liability Waiver and Agreement</span>{" "}
                        and confirm that all information provided is accurate. I agree to abide by EazyFights Academy's
                        rules and regulations. *
                      </Label>
                    </div>
                    {errors.agreeToWaiver && <p className="text-red-500 text-sm">{errors.agreeToWaiver}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={nextStep} className="bg-red-600 hover:bg-red-700">
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  Complete Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
