import { Student } from "./student";

export interface FormData extends Omit<Student, "registrationDate"|"_id"|"passportPhoto"> {
    passportPhoto?:Blob | undefined
}