import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

async function dropDefaultDatabase() {
  const defaultDbName = `${process.env.NAME_DATABASE}_microservice_default`;

  const client = new Client({
    host: process.env.HOST_DATABASE,
    port: Number(process.env.PORT_DATABASE) || 5432,
    user: process.env.USER_DATABASE,
    password: process.env.USER_PASSWORD,
    database: process.env.NAME_DATABASE_ORIGIN, // Debe ser una DB distinta a la que quieres eliminar
  });

  try {
    await client.connect();

    // Verificar si la base de datos existe
    const dbExists = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1;`,
      [defaultDbName]
    );

    if (dbExists.rowCount === 0) {
      console.log(`⚠️ La base de datos "${defaultDbName}" no existe.`);
    } else {
      // Terminar conexiones activas a esa base de datos
      await client.query(`
        SELECT pg_terminate_backend(pid)
        FROM pg_stat_activity
        WHERE datname = $1 AND pid <> pg_backend_pid();
      `, [defaultDbName]);

      // Eliminar la base de datos
      await client.query(`DROP DATABASE "${defaultDbName}";`);
      console.log(`🗑️ Base de datos "${defaultDbName}" eliminada correctamente.`);
    }
  } catch (error) {
    console.error(`❌ Error al eliminar la base de datos:`, error.message);
  } finally {
    await client.end();
    process.exit(0);
  }
}

dropDefaultDatabase();
