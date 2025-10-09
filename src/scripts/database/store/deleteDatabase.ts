import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

async function dropDefaultDatabase(appCode: string, dbName: string) {

  const defaultDbName = `${appCode}_microservice_${dbName}`;

  const client = new Client({
    host: process.env.HOST_DATABASE,
    port: Number(process.env.PORT_DATABASE) || 5432,
    user: process.env.USER_DATABASE,
    password: process.env.USER_PASSWORD,
    database: process.env.NAME_DATABASE_ORIGIN,
  });

  try {
    await client.connect();
    const dbExists = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1;`,
      [defaultDbName],
    );
    if (dbExists.rowCount === 0) {
      console.log(`⚠️ La base de datos "${defaultDbName}" no existe.`);
    } else {
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
