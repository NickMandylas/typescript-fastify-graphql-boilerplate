import { Query, Resolver, ObjectType, Field } from "type-graphql";

@ObjectType()
class StatusMessage {
	@Field()
	status: string;

	@Field()
	environment: string;

	@Field()
	time: number;
}

/**
 * Query to recognise whether session ID is valid.
 * @returns {StatusMessage} Returns current status, version & time of status.
 */

@Resolver()
export class StatusResolver {
	@Query(() => StatusMessage)
	async Status(): Promise<StatusMessage> {
		const res = new StatusMessage();
		res.status = "up";
		res.environment = process.env.NODE_ENV!;
		res.time = Date.now();

		return res;
	}
}
