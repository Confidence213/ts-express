FROM node:16
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
RUN npm run build
CMD [ "node", "dist/server.js" ]