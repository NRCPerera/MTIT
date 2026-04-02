/**
 * Swagger path definitions for Gateway health endpoint
 */
module.exports = {
  '/health': {
    get: {
      tags: ['Gateway'],
      summary: 'Health check',
      responses: {
        200: {
          description: 'Gateway is healthy',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'UP' },
                  service: { type: 'string', example: 'api-gateway' },
                  timestamp: { type: 'string', example: '2026-03-23T00:00:00.000Z' },
                },
              },
            },
          },
        },
      },
    },
  },
};
