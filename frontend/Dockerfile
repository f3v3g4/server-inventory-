FROM node:18 as builder  # Cambia a Node 18 (LTS actual)

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --silent

COPY src/ src/
COPY public/ public/

RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
