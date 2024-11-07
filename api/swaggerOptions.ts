// swaggerOptions.ts
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0', // especifica la versión de OpenAPI
  info: {
    title: 'Biblioteca API',
    version: '1.0.0',
    description: 'API para gestionar una biblioteca',
  },
  servers: [
    {
      url: 'http://localhost:3001/api', // URL de tu API
    },
  ],
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: ['./src/docs/*.ts'], // ruta a tus archivos de rutas donde tienes las definiciones de Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
