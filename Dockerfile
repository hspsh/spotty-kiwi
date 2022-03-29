FROM node:16-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn tsc --outDir build

FROM node:16-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY bin ./bin
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY --from=build /app/build ./

CMD ["node", "./"]
