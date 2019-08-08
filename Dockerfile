FROM node:10.15-alpine

LABEL mantainer="sairoko16@gmail.com"

ARG APP_PORT

RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app/

# Using flag --force as temporarily patch
RUN npm i -g nodemon --force
RUN npm install --force

COPY . /usr/src/app

WORKDIR /usr/src/app

EXPOSE $APP_PORT

CMD ["npm", "start"]