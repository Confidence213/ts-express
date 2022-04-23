FROM node:16-alpine
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/server.js" ]