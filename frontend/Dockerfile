FROM node:16 as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN (npm install --silent || echo "Ignoring npm warning") && \
    [ -d "node_modules" ]  # Verifica que se instalaron las dependencias

COPY src/ src/
COPY public/ public/

RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
