import {MikroORM, Utils} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
import {RpcException} from '@nestjs/microservices';
import {HttpStatus} from '@nestjs/common';

dotenv.config();

export async function runMigrationsCustom(dbName: string) {
    try {
        console.log('🚀 Iniciando migraciones...');
        // MikroORM infiere el tipo automáticamente
        const orm = await MikroORM.init({
            driver: PostgreSqlDriver,
            host: process.env.HOST_DATABASE,
            port: Number(process.env.PORT_DATABASE),
            dbName: dbName,  // Usamos la nueva base de datos
            user: process.env.USER_DATABASE,
            password: process.env.USER_PASSWORD,
            allowGlobalContext: true,
            entities: ['dist/src/infrastructure/adapters/out/database/**/*.entity.js'],
            entitiesTs: ['./src/infrastructure/adapters/out/database/**/*.entity.ts'],
            migrations: {
                tableName: 'mikro_orm_migrations',  // Nombre de la tabla de migraciones
                path: './dist/src/migrations/mikroorm',  // Ruta de las migraciones,
                pathTs: './src/migrations/mikroorm',
                transactional: true,
                allOrNothing: true,
                emit: 'ts',
            },
        });
        const migrator = orm.getMigrator();
        const executedMigrations = await migrator.up(); // Ejecutar las migraciones existentes
        console.log('✅ Migraciones ejecutadas:', executedMigrations);
        await orm.close();  // Cerrar la conexión
        console.log('🔄 Conexión cerrada correctamente.');
    } catch (error) {
        console.error('❌ Error al ejecutar las migraciones:', error);
        throw new RpcException({message: error.message, code: HttpStatus.BAD_REQUEST});
    }
}

export async function runInitialMigrationCustom(dbName: string) {
    console.log(`🚀 Ejecutando migración inicial en la base de datos: ${dbName}`);

    const orm = await MikroORM.init({
        host: process.env.HOST_DATABASE,
        port: Number(process.env.PORT_DATABASE) || 5432,
        user: process.env.USER_DATABASE,
        password: process.env.USER_PASSWORD,
        dbName: dbName, // Base de datos recién creada
        driver: PostgreSqlDriver,
        entities: ['dist/src/infrastructure/adapters/out/database/**/*.entity.js'],
        entitiesTs: ['./src/infrastructure/adapters/out/database/**/*.entity.ts'],
        migrations: {
            path: './dist/src/migrations/mikroorm', // Ruta de las migraciones
            pathTs: './src/migrations/mikroorm', // Ruta para TS
            transactional: true,
            emit: 'ts',
        },
        allowGlobalContext: true,
    });

    const migrator = orm.getMigrator();

    try {
        await migrator.createInitialMigration();
        console.log('✅ Migración inicial creada con éxito.');
        await migrator.up();
        console.log('✅ Migraciones aplicadas correctamente.');
    } catch (error) {
        console.error('❌ Error al ejecutar la migración inicial:', error);
        await runMigrationsCustom(dbName);
        console.log('✅ Migraciones aplicadas correctamente.');
    } finally {
        await orm.close();
    }
}