import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export class ErrorHandler {
  static handle(
    error: FastifyError,
    _request: FastifyRequest,
    response: FastifyReply,
  ) {
    if (error.cause) {
      const safeError = error as Error

      return response
        .status(safeError.cause as number)
        .send({ message: safeError.message })
    }

    return response.status(500).send({
      message: error.message,
    })
  }
}
