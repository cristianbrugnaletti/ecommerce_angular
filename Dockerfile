# Usa un'immagine Node.js con la tua versione specifica
FROM node:20.5.0

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

COPY package.json /app/package.json
# Copia i file del tuo progetto Angular nella directory di lavoro
COPY . .

# Installa le dipendenze del progetto
RUN npm install

# Compila l'app Angular per la produzione
RUN npm run build

# Esponi la porta 80 per l'app Angular
EXPOSE 4200

# Comando per avviare l'app Angular
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"]

