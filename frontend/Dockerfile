FROM node:16 as builder

WORKDIR /usr/src/app

# Actualiza npm primero
RUN npm install -g npm@8.19.4

COPY package*.json ./
RUN npm install --silent

COPY src/ src/
COPY public/ public/

RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
