#!/bin/sh
set -e

echo "Ejecutando migraciones de la base de datos..."
npm run typeorm:migrate:prod

echo "Iniciando la aplicación..."
npm run start:prod
