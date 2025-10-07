FROM node:18 as build-stage
WORKDIR /app
COPY package*.json ./
COPY ./dist/build ./app/dist/build
COPY . .

# Etapa de producción
FROM nginx:1.18-alpine as production-stage
COPY --from=build-stage /app/dist/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html/src
RUN  rm -rf /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/
COPY ./package.json .
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
