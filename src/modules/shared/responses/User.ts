import { ObjectType, Field } from "type-graphql";
import { Error } from "./Error";
import { User } from "../../../entities/User";

@ObjectType()
export class UserResponse {
	@Field(() => [Error], { nullable: true })
	errors?: Error[];

	@Field(() => User, { nullable: true })
	user?: User;
}
