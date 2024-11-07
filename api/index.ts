import server from './src/app'; // Asegúrate de que la ruta sea correcta
import { conn } from './src/config/db'; // Ahora debería funcionar correctamente

// Sincronizar todos los modelos a la vez.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}).catch((error: unknown) => {
  console.error('Error syncing the database:', error);
});
