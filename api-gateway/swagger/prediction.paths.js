/**
 * Swagger path definitions for Prediction Service
 */
module.exports = {
  '/api/prediction/predict/{crop}': {
    get: {
      tags: ['Prediction'],
      summary: 'Predict crop price (proxied)',
      parameters: [
        { name: 'crop', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Price prediction result' } },
    },
  },
  '/api/prediction/crops': {
    get: {
      tags: ['Prediction'],
      summary: 'Get all supported crops (proxied)',
      responses: { 200: { description: 'List of crops' } },
    },
    post: {
      tags: ['Prediction'],
      summary: 'Create a new crop entry (proxied)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CropInput' },
          },
        },
      },
      responses: { 201: { description: 'Crop created' }, 400: { description: 'Validation error' } },
    },
  },
  '/api/prediction/crops/{id}': {
    get: {
      tags: ['Prediction'],
      summary: 'Get a crop by ID (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Crop found' }, 404: { description: 'Crop not found' } },
    },
    put: {
      tags: ['Prediction'],
      summary: 'Update a crop (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CropInput' },
          },
        },
      },
      responses: { 200: { description: 'Crop updated' }, 400: { description: 'Validation error' }, 404: { description: 'Crop not found' } },
    },
    delete: {
      tags: ['Prediction'],
      summary: 'Delete a crop (proxied)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: { 200: { description: 'Crop deleted' }, 404: { description: 'Crop not found' } },
    },
  },
};
