# Usa una imagen oficial de Node.js como base
FROM node:22

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Expone el puerto que usará tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
