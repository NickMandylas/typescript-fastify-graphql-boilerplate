import { User } from "entities/User";
import { Field, ObjectType } from "type-graphql";
import { Error } from "./Error";

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken?: string;

  @Field(() => User)
  user?: User;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
