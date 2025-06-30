FROM node:16 as builder

WORKDIR /usr/src/app

# Desactiva completamente las notificaciones de npm
RUN npm config set update-notifier false

COPY package*.json ./

# Instala dependencias ignorando completamente los warnings
RUN npm install --silent --no-audit --no-fund

COPY src/ src/
COPY public/ public/

RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
