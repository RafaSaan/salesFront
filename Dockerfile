FROM node:20   
WORKDIR /app
# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./
# install all deps
RUN npm install
# copy all filtes
COPY . .    

# vite default port
EXPOSE 5173    
CMD ["npm", "run", "dev"]