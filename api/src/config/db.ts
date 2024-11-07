import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

dotenv.config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env;

// Inicializa la conexión a la base de datos
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log para ver las consultas SQL crudas
  native: false,  // permite que Sequelize use pg-native para ~30% más de velocidad
});

const basename = path.basename(__filename);
const modelDefiners: any[] = [];

// Asegúrate de que la ruta sea correcta
const modelsPath = path.join(__dirname, '../models');

// Verificamos si la carpeta models existe antes de intentar leerla
if (!fs.existsSync(modelsPath)) {
  console.error(`La carpeta de modelos no existe en la ruta: ${modelsPath}`);
  process.exit(1); // Salimos si no existe
}

// Leemos todos los archivos de la carpeta Models
fs.readdirSync(modelsPath)
  .filter((file: string) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
  .forEach((file: string) => {
    const model = require(path.join(modelsPath, file));
    modelDefiners.push(model.default || model); // Importamos el modelo en TypeScript
  });

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model: any) => model.initialize(sequelize)); // Aquí se llama a initialize

// Capitalizamos los nombres de los modelos, pero sin modificar la propiedad `models`
const capitalizedModels: { [key: string]: any } = {};
Object.entries(sequelize.models).forEach(([key, value]) => {
  capitalizedModels[key[0].toUpperCase() + key.slice(1)] = value;
});

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Book, Loan } = capitalizedModels;

// Acá vendrían las relaciones entre los modelos

// Un usuario puede tener muchos préstamos (Loans)
User.hasMany(Loan, { foreignKey: 'userId', as: 'loans' });
Loan.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Un libro puede tener muchos préstamos (Loans)
Book.hasMany(Loan, { foreignKey: 'bookId', as: 'loans' });
Loan.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

// Exportamos los modelos capitalizados y la conexión
export const conn = sequelize; // Exportar la conexión
export default capitalizedModels; // Exportar solo los modelos capitalizados
