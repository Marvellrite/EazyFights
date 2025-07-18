import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
  // private users = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane.smith@example.com",
  //   },
  //   {
  //     id: 3,
  //     name: "Michael Johnson",
  //     email: "michael.johnson@example.com",
  //   },
  //   {
  //     id: 4,
  //     name: "Emily Davis",
  //     email: "emily.davis@example.com",
  //   },
  //   {
  //     id: 5,
  //     name: "Robert Brown",
  //     email: "robert.brown@example.com",
  //   },
  //   {
  //     id: 6,
  //     name: "Sarah Wilson",
  //     email: "sarah.wilson@example.com",
  //   },
  // ];

  constructor(@InjectModel(User.name) private user: Model<User>) {}

  getAllUsers() {
    return this.user.find({});
  }

  async getAUser(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException("User Not found", 404);
    const user = await this.user.findById(id);
    if (!user) throw new HttpException("User not Found", 404);
    return user;
  }

  createUser(userInfo: CreateUserDto) {
    const newUser = new this.user(userInfo);
    console.log(newUser);
    newUser.save();
    return newUser;
  }

  async deleteUsers(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException("User Not found", 404);
    await this.user.findByIdAndDelete(id);
    return { msg: "User Deleted Successfully" };
  }

  async updateUser(id: string, userInfo: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException("User Not found", 404);
    const user = await this.user.findByIdAndUpdate(id, userInfo);
    return { msg: "User Updated Successfully" };
  }
}
