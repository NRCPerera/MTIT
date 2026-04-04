/**
 * Swagger path definitions for Farmer Service
 */
module.exports = {
  '/api/farmers': {
    get: {
      tags: ['Farmers'],
      summary: 'Get all farmers (proxied)',
      description: 'Proxied to Farmer Service → GET /farmers',
      responses: { 200: { description: 'List of farmers' } },
    },
    post: {
      tags: ['Farmers'],
      summary: 'Register a new farmer (proxied)',
      description: 'Proxied to Farmer Service → POST /farmers',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/FarmerInput' },
          },
        },
      },
      responses: { 201: { description: 'Farmer created' }, 400: { description: 'Validation error' } },
    },
  },
  '/api/farmers/{farmerId}': {
    get: {
      tags: ['Farmers'],
      summary: 'Get a farmer by ID (proxied)',
      description: 'Proxied to Farmer Service → GET /farmers/:farmerId',
      parameters: [
        { name: 'farmerId', in: 'path', required: true, schema: { type: 'string' }, description: 'Farmer UUID', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
      ],
      responses: { 200: { description: 'Farmer found' }, 404: { description: 'Farmer not found' } },
    },
    put: {
      tags: ['Farmers'],
      summary: 'Update a farmer (proxied)',
      description: 'Proxied to Farmer Service → PUT /farmers/:farmerId',
      parameters: [
        { name: 'farmerId', in: 'path', required: true, schema: { type: 'string' }, description: 'Farmer UUID' },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/FarmerInput' },
          },
        },
      },
      responses: { 200: { description: 'Farmer updated' }, 400: { description: 'Validation error' }, 404: { description: 'Farmer not found' } },
    },
    delete: {
      tags: ['Farmers'],
      summary: 'Delete a farmer (proxied)',
      description: 'Proxied to Farmer Service → DELETE /farmers/:farmerId',
      parameters: [
        { name: 'farmerId', in: 'path', required: true, schema: { type: 'string' }, description: 'Farmer UUID' },
      ],
      responses: { 200: { description: 'Farmer deleted' }, 404: { description: 'Farmer not found' } },
    },
  },
};
