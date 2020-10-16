import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../../entities/User";
import { FastifyContext } from "../../../types/Context";
import { UserResponse } from "../../shared/responses/User";

/**
 * Query to recognise whether session ID is valid.
 * @param {MyContext} ctx Context for express req & res handling.
 * @returns {User | undefined} Returns created User object.
 */

@Resolver()
export class MeResolver {
	@Query(() => UserResponse, { nullable: true })
	async Me(@Ctx() ctx: FastifyContext): Promise<UserResponse> {
		if (!ctx.request.session.userId) {
			return {
				errors: [
					{
						field: "session",
						message: "User data could not be found for this session.",
					},
				],
			};
		}

		const user = await User.findOne(ctx.request.session!.userId);

		return { user };
	}
}
