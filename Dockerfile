FROM node:8-alpine

WORKDIR /app
ADD . /app

RUN yarn install

ENV PORT 80
EXPOSE 80

CMD yarn start
