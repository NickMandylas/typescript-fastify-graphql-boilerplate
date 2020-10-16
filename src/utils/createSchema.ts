import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";

const resolverPath: any =
	process.env.NODE_ENV === "development"
		? [__dirname + "/../modules/**/*.resolver.ts"]
		: [__dirname + "/../modules/**/*.resolver.js"];

export const createSchema = async (): Promise<GraphQLSchema> => {
	return await buildSchema({
		resolvers: resolverPath,
	});
};
