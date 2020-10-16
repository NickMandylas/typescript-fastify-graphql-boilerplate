import { Connection, createConnection } from "typeorm";

const productionORM = (): Promise<Connection> => {
	return createConnection({
		name: "default",
		type: "postgres",
		port: 5432,
		host: process.env.DB_HOST,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		synchronize: true,
		logging: true,
		entities: [__dirname + "/../entity/*.js"],
	});
};

const developmentORM = (): Promise<Connection> => {
	return createConnection({
		name: "default",
		type: "postgres",
		port: 5432,
		host: "localhost",
		username: "postgres",
		password: "postgres",
		database: "development",
		synchronize: true,
		logging: true,
		entities: [__dirname + "/../entities/*.ts"],
	});
};

export const connection: Promise<Connection> =
	process.env.NODE_ENV === "production" ? productionORM() : developmentORM();
