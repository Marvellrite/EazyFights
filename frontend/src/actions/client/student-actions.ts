import { formatToInternational } from "@/lib/utils";
import { Student } from "@/types/student";
import { FormData as FormDataT } from "@/types/formdata";

const server_url = process.env.NEXT_PUBLIC_API_URL;


export const addStudent = async(formData:FormDataT)=>{

    
      // Begining of submit fetch logic
      const tempFormData = { ...formData, contactNumber: formatToInternational(formData.contactNumber), emergencyPhoneNumber: formatToInternational(formData.emergencyPhoneNumber), registrationDate: Date().toWellFormed() }
      const mFormData = new FormData();
      (Object.keys(tempFormData)as (keyof typeof tempFormData)[]).forEach((key)=>{
        const value = tempFormData[key];
        if(tempFormData[key] instanceof Blob) mFormData.append(key, (tempFormData[key]))
          else
        mFormData.append(key, (tempFormData[key]??"").toString())
      })
        
        const response = await fetch(server_url+"registration" as string, {
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

export const deleteStudent = async()=>{
          // Begining of delete fetch logic
        
        const response = await fetch(server_url+"delete" as string, {
          method: "DELETE",
        }
      );
      if (!response.ok) {
          throw new Error("Unable to delete student");
      };
      console.log("Student Deleted Successfully");
      alert("Student Deleted Successfully");
}