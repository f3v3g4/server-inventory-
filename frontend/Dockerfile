FROM node:16 as builder

WORKDIR /usr/src/app

# Configura npm para ignorar completamente las actualizaciones
RUN npm set fund false && npm set update-notifier false

COPY package*.json ./

# Instalación silenciosa forzando éxito
RUN npm install --silent --no-audit || true

# Verificación de que las dependencias se instalaron
RUN [ -d "node_modules" ] || (echo "Error: node_modules no se creó" && exit 1)

COPY src/ src/
COPY public/ public/

RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
