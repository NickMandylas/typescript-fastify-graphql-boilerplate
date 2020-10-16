import Redis from "ioredis";

export const redis =
	process.env.NODE_ENV === "production"
		? new Redis({
				port: Number(process.env.REDIS_PORT),
				host: process.env.REDIS_HOST!,
		  })
		: new Redis();
