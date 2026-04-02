/**
 * Swagger path definitions for Buyer Service
 */
module.exports = {
  '/api/buyers': {
    get: {
      tags: ['Buyers'],
      summary: 'Get all buyers (proxied)',
      responses: { 200: { description: 'List of buyers' } },
    },
    post: {
      tags: ['Buyers'],
      summary: 'Register a new buyer (proxied)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/BuyerInput' },
          },
        },
      },
      responses: { 201: { description: 'Buyer created' }, 400: { description: 'Validation error' } },
    },
  },
  '/api/buyers/{id}': {
    get: {
      tags: ['Buyers'],
      summary: 'Get a buyer by ID (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'b001' },
      ],
      responses: { 200: { description: 'Buyer found' }, 404: { description: 'Buyer not found' } },
    },
    put: {
      tags: ['Buyers'],
      summary: 'Update a buyer (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/BuyerInput' },
          },
        },
      },
      responses: { 200: { description: 'Buyer updated' }, 400: { description: 'Validation error' }, 404: { description: 'Buyer not found' } },
    },
    delete: {
      tags: ['Buyers'],
      summary: 'Delete a buyer (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Buyer deleted' }, 404: { description: 'Buyer not found' } },
    },
  },
};
