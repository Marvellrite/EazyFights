import { createContext, useContext, type ReactNode, type Dispatch, type SetStateAction } from "react"
import type { Student } from "../types/student"
import { useStudentsFetch } from "@/custom_hooks/fetch_students"

interface StudentContextType {
  students: Student[]
  setStudents: Dispatch<SetStateAction<Student[]>>
  // addStudent: (student: Omit<Student, "id" | "registrationDate">) => void
  // deleteStudent: (id: string) => void
  // getStudent: (id: string) => Student | undefined
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

// Mock data for demonstration


export function StudentProvider({ children }: { children: ReactNode }) {
  const {students, setStudents} = useStudentsFetch();



  // const addStudent = (studentData: Omit<Student, "_id" | "registrationDate">) => {
  //   const newStudent: Student = {
  //     ...studentData,
  //     registrationDate: new Date().toISOString().split("T")[0],
  //     _id:""
  //   }
  //   setStudents((prev) => [...prev, newStudent])
  // }

  // const deleteStudent = (id: string) => {
  //   setStudents((prev) => prev.filter((student) => student._id !== id))
  // }

  // const getStudent = (id: string) => {
  //   return students.find((student) => student._id === id)
  // }

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
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
