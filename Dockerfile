# Base: define el directorio de trabajo y copia los archivos de package
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# Builder: instala todas las dependencias y compila la aplicación
FROM base AS builder
RUN npm install
COPY . .
RUN npm run build

# Target: imagen de producción
FROM base AS production
# Instala solo las dependencias de producción
RUN npm ci --only=production
# Copia la compilación desde el builder
COPY --from=builder /app/dist ./dist

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 3000

CMD ["./entrypoint.sh"]

# Target: imagen de desarrollo
FROM base AS development
# Instala todas las dependencias para que dispongas de herramientas de hot reload
RUN npm install
COPY . .
EXPOSE 3000
# Puedes usar start:dev para mantener el modo watch
CMD ["npm", "run", "start:dev"]

# Target: imagen para testing
FROM base AS testing
# Instala todas las dependencias (puede que requieras herramientas de testing adicionales)
RUN npm install
COPY . .
# Aquí se ejecutan las pruebas, por ejemplo usando Jest
CMD ["npm", "run", "test:e2e"]
