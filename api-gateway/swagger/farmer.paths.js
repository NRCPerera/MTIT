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
  '/api/farmers/{id}': {
    get: {
      tags: ['Farmers'],
      summary: 'Get a farmer by ID (proxied)',
      description: 'Proxied to Farmer Service → GET /farmers/:id',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'f001' },
      ],
      responses: { 200: { description: 'Farmer found' }, 404: { description: 'Farmer not found' } },
    },
    put: {
      tags: ['Farmers'],
      summary: 'Update a farmer (proxied)',
      description: 'Proxied to Farmer Service → PUT /farmers/:id',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
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
      description: 'Proxied to Farmer Service → DELETE /farmers/:id',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Farmer deleted' }, 404: { description: 'Farmer not found' } },
    },
  },
};
