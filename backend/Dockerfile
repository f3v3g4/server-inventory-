FROM node:16

WORKDIR /usr/src/app

# Copiar solo los archivos necesarios para npm install
COPY package*.json ./

# Verificación explícita del package.json
RUN ls -la && \
    cat package.json && \
    npm install --production --silent

# Copiar el resto de la aplicación
COPY src/ src/

EXPOSE 5000

CMD ["node", "src/app.js"]