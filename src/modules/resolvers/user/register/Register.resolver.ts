import argon2 from "argon2";
import { User } from "entities/User";
import { UserResponse } from "modules/shared/responses/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import { RegisterInput } from "./Register.input";

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
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput,
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
