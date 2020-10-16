import { FastifyReply, FastifyRequest } from "fastify";

export interface FastifyContext {
	request: FastifyRequest;
	reply: FastifyReply;
}
