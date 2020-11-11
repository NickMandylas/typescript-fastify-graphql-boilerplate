import { Ctx, Mutation, Resolver } from "type-graphql";
import { FastifyContext } from "types/Context";

/**
 * MUTATION for member logout.
 * @param {MyContext} ctx Context for express req & res handling.
 * @returns {Boolean} Returns a boolean response for whether user session has been deleted.
 */
@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: FastifyContext): Promise<Boolean> {
    const refreshToken = await ctx.reply.jwtSign({});

    ctx.reply.setCookie("jid", refreshToken, {
      domain: "localhost",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: true,
    });

    return true;
  }
}
