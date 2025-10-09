import {Client} from 'pg';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
import {runMigrationsCustom} from "./migrationDatabaseCustom";

dotenv.config();

export async function createDatabaseCustom(tenant: string) {
    const defaultDbName = `${process.env.NAME_DATABASE}_microservice_${tenant}`;

    const client = new Client({
        host: process.env.HOST_DATABASE,
        port: Number(process.env.PORT_DATABASE) || 5432,
        user: process.env.USER_DATABASE,
        password: process.env.USER_PASSWORD,
        database: process.env.NAME_DATABASE_ORIGIN,
    });

    try {
        await client.connect();

        // Verificar si la base ya existe
        const dbExists = await client.query(
            `SELECT 1
             FROM pg_database
             WHERE datname = $1;`,
            [defaultDbName],
        );

        if (dbExists.rowCount === 0) {
            await client.query(`CREATE DATABASE "${defaultDbName}";`);
            console.log(`✅ Base de datos "${defaultDbName}" creada correctamente.`);
        } else {
            console.log(`⚠️ La base de datos "${defaultDbName}" ya existe.`);
        }

        await client.end();

        // Conectamos a la base recién creada o existente
        const tenantClient = new Client({
            host: process.env.HOST_DATABASE,
            port: Number(process.env.PORT_DATABASE) || 5432,
            user: process.env.USER_DATABASE,
            password: process.env.USER_PASSWORD,
            database: defaultDbName,
        });

        await tenantClient.connect();

        // Verificar si existe la tabla de migraciones
        const tableExists = await tenantClient.query(
            `SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'mikro_orm_migrations';`,
        );

        if (tableExists.rowCount === 0) {
            console.log('⚠️ No existe la tabla de migraciones, creando...');
            await tenantClient.query(`
                CREATE TABLE "mikro_orm_migrations"
                (
                    id          SERIAL PRIMARY KEY,
                    name        VARCHAR(255) NOT NULL,
                    executed_at TIMESTAMP    NOT NULL DEFAULT now()
                );
            `);
            console.log('✅ Tabla "mikroorm_migrations" creada.');
        }

        await tenantClient.end();

        console.log('🔄 Ejecutando migraciones...');
        await runMigrationsCustom(defaultDbName);

    } catch (error: any) {
        console.error(`❌ Error al crear la base de datos:`, error.message);
    } finally {
        await client.end().catch(() => {
        });
    }
}