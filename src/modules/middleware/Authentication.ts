import { createMethodDecorator } from "type-graphql";
import { FastifyContext } from "types/Context";

export function Authentication(): MethodDecorator {
  return createMethodDecorator<FastifyContext>(async ({ context }, next) => {
    return context.request.jwtVerify((err: any, decode: any) => {
      if (err || decode.userId === undefined) {
        return {
          errors: [
            {
              field: "authentication",
              message: "Not authenticated or doesn't have valid credentials.",
            },
          ],
        };
      }
      context.payload = decode;
      return next();
    });
  });
}
