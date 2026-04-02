/**
 * Swagger path definitions for Logistics Service
 */
module.exports = {
  '/api/logistics/deliveries': {
    get: {
      tags: ['Logistics'],
      summary: 'Get all deliveries (proxied)',
      responses: { 200: { description: 'List of deliveries' } },
    },
    post: {
      tags: ['Logistics'],
      summary: 'Create a delivery (proxied)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/DeliveryInput' },
          },
        },
      },
      responses: { 201: { description: 'Delivery created' }, 400: { description: 'Validation error' } },
    },
  },
  '/api/logistics/deliveries/{id}': {
    get: {
      tags: ['Logistics'],
      summary: 'Track a delivery (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Delivery details' } },
    },
    put: {
      tags: ['Logistics'],
      summary: 'Update a delivery (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/DeliveryInput' },
          },
        },
      },
      responses: { 200: { description: 'Delivery updated' }, 400: { description: 'Validation error' }, 404: { description: 'Delivery not found' } },
    },
    delete: {
      tags: ['Logistics'],
      summary: 'Delete a delivery (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Delivery deleted' }, 404: { description: 'Delivery not found' } },
    },
  },
};
