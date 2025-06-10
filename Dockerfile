# Utilise une image officielle de Node.js
FROM node:22

# Dossier de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code
COPY . .

ENV PORT=8080

# Expose le port (à adapter si nécessaire)
EXPOSE $PORT

# Lance l'application
CMD ["npm", "start"]
