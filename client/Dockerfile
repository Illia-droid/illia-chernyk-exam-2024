FROM node:18.17.1-alpine3.18

ARG NODE_ENV="development"

RUN mkdir -p ./client

WORKDIR /client

COPY package*.json ./

COPY . .

EXPOSE 5000

RUN npm install

RUN chown -R node:node /client/node_modules

CMD npm start
