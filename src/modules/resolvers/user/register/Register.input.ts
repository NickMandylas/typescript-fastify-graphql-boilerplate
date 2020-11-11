import { IsEmail, Length } from "class-validator";
import { IsEmailAlreadyExist } from "modules/shared/isEmailAlreadyExist";
import { PasswordInput } from "modules/shared/isPassword";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255, { message: "First name is too small." })
  firstName: string;

  @Field()
  @Length(1, 255, { message: "Second name is too small" })
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already in use." })
  email: string;
}
