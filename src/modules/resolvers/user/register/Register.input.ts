import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../../../shared/isEmailAlreadyExist";
import { PasswordInput } from "../../../shared/isPassword";

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
