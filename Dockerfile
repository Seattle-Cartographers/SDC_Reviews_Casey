FROM node:12.14-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build:prod
EXPOSE 3004
CMD [ "npm", "run", "server:prod" ]