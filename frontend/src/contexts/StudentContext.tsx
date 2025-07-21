"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Student } from "../types/student"

interface StudentContextType {
  students: Student[]
  addStudent: (student: Omit<Student, "id" | "registrationDate">) => void
  deleteStudent: (id: string) => void
  getStudent: (id: string) => Student | undefined
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(mockStudents)

  const addStudent = (studentData: Omit<Student, "id" | "registrationDate">) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString().split("T")[0],
    }
    setStudents((prev) => [...prev, newStudent])
  }

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id))
  }

  const getStudent = (id: string) => {
    return students.find((student) => student.id === id)
  }

  return (
    <StudentContext.Provider value={{ students, addStudent, deleteStudent, getStudent }}>
      {children}
    </StudentContext.Provider>
  )
}

export function useStudents() {
  const context = useContext(StudentContext)
  if (context === undefined) {
    throw new Error("useStudents must be used within a StudentProvider")
  }
  return context
}
