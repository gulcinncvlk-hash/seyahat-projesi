const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Akıllı Seyahat Planlama API',
    version: '1.0.0',
    description: 'Seyahat planlama sistemi için tam CRUD işlemlerini içeren RESTful API dokümantasyonu.'
  },
  servers: [{ url: 'http://localhost:3000', description: 'Geliştirme Sunucusu' }],
  paths: {
    '/api/seyahatler': {
      get: {
        summary: 'Tüm seyahatleri listeler',
        responses: { '200': { description: 'Başarılı' } }
      },
      post: {
        summary: 'Yeni bir seyahat ekler',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  sehir: { type: 'string', example: 'Paris' },
                  tarih: { type: 'string', example: '2026-08-20' },
                  durum: { type: 'string', example: 'Planlanıyor' },
                  butce: { type: 'number', example: 15000 }
                }
              }
            }
          }
        },
        responses: { '201': { description: 'Seyahat başarıyla eklendi' } }
      }
    },
    '/api/seyahatler/{id}': {
      delete: {
        summary: 'Sistemden bir seyahati siler',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Başarıyla silindi' } }
      }
    }
  }
};

module.exports = { swaggerUi, swaggerDocument };