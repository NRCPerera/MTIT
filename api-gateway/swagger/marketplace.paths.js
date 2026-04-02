/**
 * Swagger path definitions for Marketplace Service (Products & Orders)
 */
module.exports = {
  // ─── Product Routes ─────────────────────────────────────────
  '/api/marketplace/products': {
    get: {
      tags: ['Marketplace'],
      summary: 'Get all products (proxied)',
      responses: { 200: { description: 'List of products' } },
    },
    post: {
      tags: ['Marketplace'],
      summary: 'Create a product listing (proxied)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ProductInput' },
          },
        },
      },
      responses: { 201: { description: 'Product created' }, 400: { description: 'Validation error' } },
    },
  },
  '/api/marketplace/products/{id}': {
    get: {
      tags: ['Marketplace'],
      summary: 'Get a product by ID (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Product found' }, 404: { description: 'Product not found' } },
    },
    put: {
      tags: ['Marketplace'],
      summary: 'Update a product (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ProductInput' },
          },
        },
      },
      responses: { 200: { description: 'Product updated' }, 400: { description: 'Validation error' }, 404: { description: 'Product not found' } },
    },
    delete: {
      tags: ['Marketplace'],
      summary: 'Delete a product (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Product deleted' }, 404: { description: 'Product not found' } },
    },
  },

  // ─── Order Routes ───────────────────────────────────────────
  '/api/marketplace/orders': {
    get: {
      tags: ['Marketplace'],
      summary: 'Get all orders (proxied)',
      responses: { 200: { description: 'List of orders' } },
    },
    post: {
      tags: ['Marketplace'],
      summary: 'Place an order (proxied)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/OrderInput' },
          },
        },
      },
      responses: { 201: { description: 'Order placed' }, 400: { description: 'Validation error' } },
    },
  },
  '/api/marketplace/orders/{id}': {
    get: {
      tags: ['Marketplace'],
      summary: 'Get an order by ID (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Order found' }, 404: { description: 'Order not found' } },
    },
    put: {
      tags: ['Marketplace'],
      summary: 'Update an order (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'string', enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'] },
                deliveryAddress: { type: 'string' },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'Order updated' }, 400: { description: 'Validation error' }, 404: { description: 'Order not found' } },
    },
    delete: {
      tags: ['Marketplace'],
      summary: 'Delete an order (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Order deleted' }, 404: { description: 'Order not found' } },
    },
  },
};
