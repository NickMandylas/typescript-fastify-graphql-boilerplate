import argon2 from "argon2";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../../../entities/User";
import { FastifyContext } from "../../../../types/Context";
import { LoginInput } from "./Login.input";
import { UserResponse } from "../../../shared/responses/User";

/**
 * MUTATION for User login.
 * @param {String} email
 * @param {String} password
 * @returns {UserResponse} Returns user entity is request is successful.
 */
@Resolver()
export class LoginResolver {
	@Mutation(() => UserResponse, { nullable: true })
	async Login(
		@Arg("data") { email, password }: LoginInput,
		@Ctx() ctx: FastifyContext
	): Promise<UserResponse> {
		const user = await User.findOne({ where: { email } });

		// Unable to find user in database.
		if (!user) {
			return {
				errors: [
					{
						field: "emailOrPassword",
						message: "Email or password is incorrect.",
					},
				],
			};
		}

		const valid = await argon2.verify(user.password, password);

		// Password is incorrect.
		if (!valid) {
			return {
				errors: [
					{
						field: "emailOrPassword",
						message: "Email or password is incorrect.",
					},
				],
			};
		}

		ctx.request.session.userId = user.id;

		return { user };
	}
}
