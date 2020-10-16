import { Ctx, Mutation, Resolver } from "type-graphql";
import { FastifyContext } from "../../../../types/Context";

/**
 * MUTATION for member logout.
 * @param {MyContext} ctx Context for express req & res handling.
 * @returns {Boolean} Returns a boolean response for whether user session has been deleted.
 */
@Resolver()
export class LogoutResolver {
	@Mutation(() => Boolean)
	async Logout(@Ctx() ctx: FastifyContext): Promise<Boolean> {
		return new Promise((res, rej) => {
			ctx.request.destroySession((err) => {
				if (err) {
					ctx.request.log.error(err);
					return rej(false);
				}

				ctx.reply.clearCookie("sid");
				return res(true);
			});
		});
	}
}
