import fastifySession from "fastify-session";
import connectRedis from "connect-redis";
import { RedisClient } from "redis";
import { redis } from "./redis";

const RedisStore = connectRedis(fastifySession as any);

export const sessionStore = new RedisStore({
	client: (redis as unknown) as RedisClient,
});

export const sessionOptions: fastifySession.Options = {
	store: sessionStore,
	saveUninitialized: false,
	cookieName: "sid",
	secret:
		process.env.SESSION_SECRET ||
		"R4ndomThirtyTwoCh4rcterStr1ngToGetSessionsWorking",
	cookie: {
		httpOnly: true,
		domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : "",
		secure: process.env.NODE_ENV === "production",
		maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
	},
};
