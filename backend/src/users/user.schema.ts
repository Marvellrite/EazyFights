import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop({ isRequired: true })
  name: string;

  @Prop()
  age: number;

  @Prop({ unique: true, isRequired: true })
  username: string;
}

export const userSchema = SchemaFactory.createForClass(User);
