"use client"

import { useState } from "react"
import Image from "next/image"
import { useStudents } from "@/contexts/StudentContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/shadcn/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog"
import { Badge } from "@/components/shadcn/badge"
import { Search, Eye, Trash2, Users, Calendar, Phone, Mail } from "lucide-react"
import type { Student } from "@/types/student"
import { StudentProvider } from "@/contexts/StudentContext";

function AdminDashboard() {
  const { students, deleteStudent } = useStudents()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.contactNumber.includes(searchTerm),
  )

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student)
    setIsDetailsOpen(true)
  }

  const handleDeleteStudent = (studentId: string) => {
    deleteStudent(studentId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getExperienceBadgeColor = (experience: string) => {
    switch (experience) {
      case "none":
        return "bg-gray-100 text-gray-800"
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getGoalBadgeColor = (goal: string) => {
    switch (goal) {
      case "fitness":
        return "bg-purple-100 text-purple-800"
      case "self-defense":
        return "bg-red-100 text-red-800"
      case "weight-loss":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage registered students and view their information</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                students.filter((s) => {
                  const registrationDate = new Date(s.registrationDate)
                  const now = new Date()
                  return (
                    registrationDate.getMonth() === now.getMonth() &&
                    registrationDate.getFullYear() === now.getFullYear()
                  )
                }).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beginners</CardTitle>
            <Badge variant="secondary" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                students.filter((s) => s.martialArtsExperience === "beginner" || s.martialArtsExperience === "none")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Conditions</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter((s) => s.hasPreExistingConditions === "yes").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Search and manage registered students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Primary Goal</TableHead>
                  <TableHead>Health Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No students found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>
                        <div className="w-12 h-16 border border-gray-300 rounded overflow-hidden">
                          {student.passportPhoto ? (
                            <Image
                              src={student.passportPhoto || "/placeholder.svg"}
                              alt={`${student.fullName}'s photo`}
                              width={48}
                              height={64}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <Users className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.fullName}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.gender} • {student.nationality}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {student.emailAddress}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {student.contactNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(student.registrationDate)}</TableCell>
                      <TableCell>
                        <Badge className={getExperienceBadgeColor(student.martialArtsExperience)}>
                          {student.martialArtsExperience}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getGoalBadgeColor(student.primaryGoal)}>{student.primaryGoal}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.hasPreExistingConditions === "yes" ? "destructive" : "secondary"}>
                          {student.hasPreExistingConditions === "yes" ? "Has Conditions" : "Healthy"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(student)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Student</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {student.fullName}'s registration? This action cannot
                                  be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteStudent(student._id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Student Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
            {/* Passport Photo Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-700">Passport Photo</h3>
              <div className="flex justify-center bg-gray-50 p-4 rounded-lg">
                {selectedStudent.passportPhoto ? (
                  <div className="relative">
                    <img
                      src={selectedStudent.passportPhoto || "/placeholder.svg"}
                      alt={`${selectedStudent.fullName}'s passport photo`}
                      className="w-32 h-40 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-40 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm">👤</span>
                      </div>
                      <p className="text-xs">No photo</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-700">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-sm">{selectedStudent.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="text-sm">{formatDate(selectedStudent.dateOfBirth)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Gender</label>
                    <p className="text-sm capitalize">{selectedStudent.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nationality</label>
                    <p className="text-sm">{selectedStudent.nationality}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contact Number</label>
                    <p className="text-sm">{selectedStudent.contactNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email Address</label>
                    <p className="text-sm">{selectedStudent.emailAddress}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-700">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Street Address</label>
                    <p className="text-sm">{selectedStudent.streetAddress}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">City/Town</label>
                    <p className="text-sm">{selectedStudent.cityTown}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">State/Province</label>
                    <p className="text-sm">{selectedStudent.stateProvince}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-700">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contact Name</label>
                    <p className="text-sm">{selectedStudent.emergencyContactName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Relationship</label>
                    <p className="text-sm">{selectedStudent.relationship}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone Number</label>
                    <p className="text-sm">{selectedStudent.emergencyPhoneNumber}</p>
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-700">Health Information</h3>
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Pre-existing Conditions</label>
                    <p className="text-sm capitalize">{selectedStudent.hasPreExistingConditions}</p>
                    {selectedStudent.medicalConditionsDetails && (
                      <p className="text-sm mt-1 text-gray-700">{selectedStudent.medicalConditionsDetails}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Taking Medications</label>
                    <p className="text-sm capitalize">{selectedStudent.takingMedications}</p>
                    {selectedStudent.medicationsDetails && (
                      <p className="text-sm mt-1 text-gray-700">{selectedStudent.medicationsDetails}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Recent Surgeries</label>
                    <p className="text-sm capitalize">{selectedStudent.hadSurgeries}</p>
                    {selectedStudent.surgeriesDetails && (
                      <p className="text-sm mt-1 text-gray-700">{selectedStudent.surgeriesDetails}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Training Goals */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-700">Training Goals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Primary Goal</label>
                    <p className="text-sm capitalize">{selectedStudent.primaryGoal}</p>
                    {selectedStudent.otherGoalDetails && (
                      <p className="text-sm mt-1 text-gray-700">{selectedStudent.otherGoalDetails}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Martial Arts Experience</label>
                    <p className="text-sm capitalize">{selectedStudent.martialArtsExperience}</p>
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-700">Registration Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Registration Date</label>
                    <p className="text-sm">{formatDate(selectedStudent.registrationDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Liability Waiver</label>
                    <Badge variant={selectedStudent.agreeToWaiver ? "secondary" : "destructive"}>
                      {selectedStudent.agreeToWaiver ? "Agreed" : "Not Agreed"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default function AdminDashboard2 (){
return(
<StudentProvider>
  <AdminDashboard/>
</StudentProvider>
)
}