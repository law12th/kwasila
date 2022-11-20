FROM node:alpine

WORKDIR /usr/app
COPY ./package.json ./
RUN yarn install
RUN yarn add pm2 -g
COPY ./ ./

CMD [ "yarn", "run", "start:prod" ]