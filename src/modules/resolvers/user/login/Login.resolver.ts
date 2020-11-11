import argon2 from "argon2";
import { User } from "entities/User";
import { LoginResponse } from "modules/shared/responses/Login";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { FastifyContext } from "types/Context";
import { LoginInput } from "./Login.input";

/**
 * MUTATION for User login.
 * @param {String} email
 * @param {String} password
 * @returns {UserResponse} Returns user entity is request is successful.
 */
@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() ctx: FastifyContext,
  ): Promise<LoginResponse> {
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

    const refreshToken = await ctx.reply.jwtSign(
      { userId: user.id },
      { expiresIn: "7d" },
    );

    ctx.reply.setCookie("jid", refreshToken, {
      domain: "localhost",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: true,
    });

    const accessToken = await ctx.reply.jwtSign(
      { userId: user.id },
      { expiresIn: "15m" },
    );

    // For when using sessions
    // ctx.request.session.userId = user.id;

    return { user, accessToken };
  }
}
