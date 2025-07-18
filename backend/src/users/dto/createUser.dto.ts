import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  username: string;
}
