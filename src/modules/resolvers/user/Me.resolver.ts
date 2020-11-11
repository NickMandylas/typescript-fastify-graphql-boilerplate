import { User } from "entities/User";
import { Authentication } from "modules/middleware/Authentication";
import { UserResponse } from "modules/shared/responses/User";
import { Ctx, Query, Resolver } from "type-graphql";
import { FastifyContext } from "types/Context";

/**
 * Query to recognise whether session ID is valid.
 * @param {MyContext} ctx Context for express req & res handling.
 * @returns {User | undefined} Returns created User object.
 */

@Resolver()
export class MeResolver {
  @Authentication()
  @Query(() => UserResponse, { nullable: true })
  async me(@Ctx() ctx: FastifyContext): Promise<UserResponse> {
    const user = await User.findOne({ where: { id: ctx.payload.userId } });

    if (!user) {
      return {
        errors: [
          {
            field: "member",
            message: "Session exists but member entity no longer in database.",
          },
        ],
      };
    }

    return { user };
  }
}
