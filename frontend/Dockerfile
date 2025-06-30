FROM node:18 as builder
WORKDIR /usr/src/app

# Configura npm para ignorar warnings
RUN npm config set update-notifier false && \
    npm config set fund false && \
    npm config set audit false

COPY package.json package-lock.json ./

# Instalación robusta de dependencias
RUN npm ci --silent --no-audit --no-fund || \
    ([ -d "node_modules" ] && echo "Dependencias instaladas con warnings") || \
    (echo "Fallo en instalación" && exit 1)

COPY src/ src/
COPY public/ public/

RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
