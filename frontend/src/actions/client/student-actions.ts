import { formatToInternational } from "@/lib/utils";
import { FormData as FormDataT } from "@/types/formdata";
import { Student } from "@/types/student";
import { Dispatch, SetStateAction } from "react";

const student_url_endpoint = process.env.NEXT_PUBLIC_API_URL+"student";


export const addStudent = async(formData:FormDataT)=>{

    
      // Begining of submit fetch logic
      const tempFormData = { ...formData, contactNumber: formatToInternational(formData.contactNumber), emergencyPhoneNumber: formatToInternational(formData.emergencyPhoneNumber), registrationDate: Date().toWellFormed() }
      const mFormData = new FormData();
      (Object.keys(tempFormData)as (keyof typeof tempFormData)[]).forEach((key)=>{
        if(tempFormData[key] instanceof Blob) mFormData.append(key, (tempFormData[key]))
          else
        mFormData.append(key, (tempFormData[key]??"").toString())
      })
        
        const response = await fetch(student_url_endpoint as string, {
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

    //   } catch (error) {
    //     console.error("Error submitting Registration:", error);
    //     alert("There was an error submitting your Registration. Please try again later.")
    //     return;
    //   }


}

export const deleteStudent = async (id: string, students: Student[], setStudents: Dispatch<SetStateAction<Student[]>>) => {
  try {
    const response = await fetch(`${student_url_endpoint}/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Unable to delete student");
    }
    setStudents((prev)=>prev.filter(student=>student._id!=id))
    console.log("Student Deleted Successfully");
    alert("Student Deleted Successfully");
  } catch (error) {
    console.error("Delete Error:", error);
    alert("Error deleting student");
  }
};
