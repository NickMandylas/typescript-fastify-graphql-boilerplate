import { User } from "entities/User";
import { ObjectType, Field } from "type-graphql";
import { Error } from "./Error";

@ObjectType()
export class UserResponse {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];

  @Field(() => User, { nullable: true })
  user?: User;
}
