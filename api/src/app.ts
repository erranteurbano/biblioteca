import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swaggerOptions';
import routes from './routes/index';  // Asegúrate de que routes esté bien configurado en TypeScript
import './config/db';  // Importa la configuración de la base de datos
import path from 'path';


// Inicializa el servidor
const server: Application = express();

server.set('name', 'API');

// Middleware de configuración
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Configuración de CORS
server.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Ajusta el dominio según tu entorno
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Sirve archivos estáticos desde la carpeta public
server.use(express.static(path.join(__dirname, '../public')));

// Usar la documentación de Swagger
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Usa las rutas
server.use('/', routes);

// Middleware para manejo de errores
server.use((err: any, req: Request, res: Response, next: NextFunction) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Exporta el servidor
export default server;
