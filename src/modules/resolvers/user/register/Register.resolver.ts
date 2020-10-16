import argon2 from "argon2";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../../entities/User";
import { RegisterInput } from "./Register.input";
import { UserResponse } from "../../../shared/responses/User";

/**
 * MUTATION for User registration.
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} email
 * @param {String} password Password is hashed using argon2.
 * @returns {user} Returns created user object.
 */

@Resolver()
export class RegisterResolver {
	@Mutation(() => UserResponse)
	async Register(
		@Arg("data") { firstName, lastName, email, password }: RegisterInput
	): Promise<UserResponse> {
		const hashedPassword = await argon2.hash(password);

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		}).save();

		return { user };
	}
}
