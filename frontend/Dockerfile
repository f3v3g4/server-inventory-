FROM node:16 as builder

WORKDIR /usr/src/app

COPY package*.json ./

# Usamos || true para ignorar el código de salida
RUN ls -la && cat package.json && (npm install --silent || true)

COPY src/ src/
COPY public/ public/

RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
