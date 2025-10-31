# ======================
# Etapa de build
# ======================
FROM node:18 as build-stage
WORKDIR /app

# Copiar solo package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar archivos de configuración de Angular y Tailwind
COPY angular.json .
COPY tsconfig*.json ./
COPY tailwind.config.js .

# Copiar código fuente
COPY ./src ./src

# Construir la app Angular optimizada para producción
RUN npm run build -- --configuration production --output-path=dist/build

# ======================
# Etapa de producción
# ======================
FROM nginx:1.18-alpine as production-stage

# Copiar archivos Angular compilados a Nginx
COPY --from=build-stage /app/dist/build /usr/share/nginx/html

# Eliminar configuración default de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copiar configuración personalizada de Nginx
COPY ./default.conf /etc/nginx/conf.d/

# Exponer puerto 80
EXPOSE 80

# Arrancar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
