# Proyecto NestJS con Clean Architecture

## Descripción

Este es un proyecto basado en **NestJS** con una arquitectura modular y limpia (**Clean Architecture**). Está diseñado para ser escalable, mantenible y flexible, utilizando buenas prácticas de desarrollo en TypeScript.

## Características

- **Framework:** NestJS
- **Arquitectura:** Clean Architecture con separación en **Application, Domain e Infrastructure**
- **ORM:** TypeORM con PostgreSQL
- **Autenticación:** JWT y Passport
- **Inyección de dependencias:** InversifyJS
- **Manejo de excepciones centralizado**
- **Pruebas unitarias y E2E con Jest**
- **Docker para configuración de base de datos**
- **Seeders para generación de datos de prueba**

## Estructura del Proyecto

```plaintext
├── src
│   ├── app.module.ts
│   ├── common (Módulos compartidos)
│   │   ├── adapters (Servicios compartidos)
│   │   │   ├── configuration (Manejo de configuraciones)
│   │   │   ├── database (Módulo para TypeORM)
│   │   │   ├── exception (Manejo de excepciones)
│   │   │   ├── logger (Manejo de logs)
│   │   │   ├── token (Manejo de JWT)
│   │   ├── helpers (Funciones auxiliares y utilidades)
│   ├── modules (Módulos específicos)
│   │   ├── auth (Autenticación)
│   │   ├── permissions (Manejo de permisos)
│   │   ├── roles (Manejo de roles)
│   │   ├── users (Usuarios)
│   │   │   ├── application (Casos de uso y reglas de negocio)
│   │   │   │   ├── use-cases
│   │   │   │   │   ├── delete-user.use-case.ts
│   │   │   │   │   ├── find-all-users.use-case.ts
│   │   │   │   │   ├── find-by-user.use-case.ts
│   │   │   │   │   ├── store-user.use-case.ts
│   │   │   │   │   ├── update-user.use-case.ts
│   │   │   ├── domain (Definiciones de entidades y contratos)
│   │   │   │   ├── user.entity.ts
│   │   │   │   ├── user.repository.interface.ts
│   │   │   │   ├── user.type.ts
│   │   │   ├── infrastructure (Implementaciones técnicas)
│   │   │   │   ├── api
│   │   │   │   │   ├── delete-user.controller.ts
│   │   │   │   │   ├── find-all-users.controller.ts
│   │   │   │   │   ├── find-by-user.controller.ts
│   │   │   │   │   ├── store-user.controller.ts
│   │   │   │   │   ├── update-user.controller.ts
│   │   │   │   ├── persistence (Repositorio y entidad en TypeORM)
│   │   │   │   │   ├── user-typeorm.repository.ts
│   │   │   │   │   ├── user.entity.ts
│   │   │   │   ├── seeders (Datos de prueba para usuarios)
│   │   │   │   │   ├── dev-users.seeder.ts
│   │   │   │   │   ├── prod-users.seeder.ts
│   │   │   │   ├── users.module.ts (Definición del módulo y DI)
│   ├── main.ts (Punto de entrada de la aplicación)
│
├── database (Migraciones y configuración de TypeORM)
│   ├── migrations
│
├── collections (Pruebas con Bruno)
├── test (Pruebas E2E)
├── docker-compose.yml (Configuración de PostgreSQL con Docker)
├── ormconfig.ts (Configuración de TypeORM)
└── package.json (Dependencias y scripts)
```

## Ejemplo de Inyección de Dependencias en el Módulo de Usuarios

En el archivo `users.module.ts`, se declara la inyección de dependencias para la infraestructura, dominio y aplicación del módulo:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/user.entity';
import { UserTypeOrmRepository } from './infrastructure/persistence/user-typeorm.repository';
import { StoreUserUseCase } from './application/use-cases/store-user.use-case';
import { UserRepositoryInterface } from './domain/user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: UserTypeOrmRepository,
    },
    StoreUserUseCase,
  ],
  exports: ['UserRepositoryInterface', StoreUserUseCase],
})
export class UsersModule {}
```

## Instalación

Clona el repositorio e instala las dependencias:

```bash
npm install
```

Crea un archivo `.env` basado en `.env.example` y configura las variables de entorno.

## Uso

Ejecutar en modo desarrollo:

```bash
npm run start:dev
```

Ejecutar en modo producción:

```bash
npm run start:prod
```

## Migraciones y Seeders

Crear y ejecutar migraciones de la base de datos:

```bash
npm run typeorm:migrate
```

Ejecutar seeders para poblar la base de datos con datos de prueba:

```bash
npm run seed
```

Revertir la última migración:

```bash
npm run typeorm:revert
```

## Pruebas

Ejecutar pruebas unitarias:

```bash
npm run test
```

Ejecutar pruebas E2E:

```bash
npm run test:e2e
```

## Contribución

Si deseas contribuir a este proyecto, por favor sigue las siguientes normas:

1. Crea un fork del repositorio.
2. Crea una nueva rama con la funcionalidad a desarrollar.
3. Asegúrate de que el código cumple con las reglas de ESLint y Prettier.
4. Realiza una solicitud de pull request describiendo los cambios realizados.

## Licencia

Este proyecto está bajo la licencia **MIT**.
