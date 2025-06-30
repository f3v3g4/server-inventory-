FROM node:16 as builder

WORKDIR /usr/src/app

# Copiar archivos de dependencias primero
COPY package*.json ./

# Verificación del contexto
RUN ls -la && \
    cat package.json && \
    npm install --silent

# Copiar el resto de la aplicación
COPY src/ src/
COPY public/ public/

RUN npm run build

FROM nginx:alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]