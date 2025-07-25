import { useState, useEffect } from "react";
import { Student } from "@/types/student";

const student_server_url_endpoint = `${process.env.NEXT_PUBLIC_API_URL}student`

const mockStudents: Student[] = [
  {
    _id: "1",
    passportPhoto: "/placeholder.svg?height=150&width=120",
    registrationDate: "2024-01-15",
    fullName: "John Smith",
    dateOfBirth: "1995-03-20",
    gender: "male",
    nationality: "American",
    contactNumber: "+1-555-0123",
    emailAddress: "john.smith@email.com",
    streetAddress: "123 Main Street",
    cityTown: "New York",
    stateProvince: "NY",
    emergencyContactName: "Jane Smith",
    relationship: "Spouse",
    emergencyPhoneNumber: "+1-555-0124",
    hasPreExistingConditions: "no",
    medicalConditionsDetails: "",
    takingMedications: "no",
    medicationsDetails: "",
    hadSurgeries: "no",
    surgeriesDetails: "",
    primaryGoal: "fitness",
    otherGoalDetails: "",
    martialArtsExperience: "beginner",
    agreeToWaiver: true,
  },
  {
    _id: "2",
    passportPhoto: "/placeholder.svg?height=150&width=120",
    registrationDate: "2024-01-18",
    fullName: "Maria Garcia",
    dateOfBirth: "1988-07-12",
    gender: "female",
    nationality: "Mexican",
    contactNumber: "+1-555-0125",
    emailAddress: "maria.garcia@email.com",
    streetAddress: "456 Oak Avenue",
    cityTown: "Los Angeles",
    stateProvince: "CA",
    emergencyContactName: "Carlos Garcia",
    relationship: "Brother",
    emergencyPhoneNumber: "+1-555-0126",
    hasPreExistingConditions: "yes",
    medicalConditionsDetails: "Previous knee injury from sports",
    takingMedications: "no",
    medicationsDetails: "",
    hadSurgeries: "no",
    surgeriesDetails: "",
    primaryGoal: "self-defense",
    otherGoalDetails: "",
    martialArtsExperience: "none",
    agreeToWaiver: true,
  },
  {
    _id: "3",
    passportPhoto: "/placeholder.svg?height=150&width=120",
    registrationDate: "2024-01-20",
    fullName: "David Chen",
    dateOfBirth: "1992-11-05",
    gender: "male",
    nationality: "Chinese",
    contactNumber: "+1-555-0127",
    emailAddress: "david.chen@email.com",
    streetAddress: "789 Pine Street",
    cityTown: "San Francisco",
    stateProvince: "CA",
    emergencyContactName: "Lisa Chen",
    relationship: "Sister",
    emergencyPhoneNumber: "+1-555-0128",
    hasPreExistingConditions: "no",
    medicalConditionsDetails: "",
    takingMedications: "yes",
    medicationsDetails: "Allergy medication (seasonal)",
    hadSurgeries: "no",
    surgeriesDetails: "",
    primaryGoal: "weight-loss",
    otherGoalDetails: "",
    martialArtsExperience: "intermediate",
    agreeToWaiver: true,
  },
]

export const useStudentsFetch = ()=>{
    const [students, setStudents] = useState<Student[]>(mockStudents);

    useEffect(
        ()=>{
            fetchStudents(setStudents)
        },[]
    )

    return {students, setStudents};

}

const fetchStudents = async(setStudents:React.Dispatch<React.SetStateAction<Student[]>>)=>{
    try{
        const response = await fetch(student_server_url_endpoint);
        if(!response.ok){
            throw new Error("Unable to fetch Students")
        }
        const regs: Student[] = await response.json();
        setStudents(regs);
    }
    catch(err){
      console.error(err)
        alert("Unable to fetch registrations")
    }
}
