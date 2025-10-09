import process from 'node:process';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';

dotenv.config();

async function runMigrations() {
  try {

    console.log('🚀 Iniciando migraciones...');

    const defaultNameDatabase: string = `${process.env.NAME_DATABASE_PREFIX}_default`;

    // MikroORM infiere el tipo automáticamente
    const orm = await MikroORM.init({
      driver: PostgreSqlDriver,
      host: process.env.HOST_DATABASE,
      port: Number(process.env.PORT_DATABASE),
      dbName: defaultNameDatabase,
      user: process.env.USER_DATABASE,
      password: process.env.USER_PASSWORD,
      allowGlobalContext: true,
      entities: ['dist/src/domain/entities/**/*.js'],
      entitiesTs: ['./src/domain/entities/**/*.ts'],
      migrations: {
        tableName: 'mikroorm_migrations',
        path: './src/migrations',
        transactional: true,
        allOrNothing: true,
        emit: 'ts',
      },
    });

    const migrator = orm.getMigrator();
    const executedMigrations = await migrator.up();

    console.log('✅ Migraciones ejecutadas:', executedMigrations);
    await orm.close();
    console.log('🔄 Conexión cerrada correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al ejecutar las migraciones:', error);
    process.exit(1);
  }
}

runMigrations();