FROM node:20

ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

RUN npm i -g serve

COPY . .

RUN pnpm run build:client

EXPOSE 3000

CMD [ "serve", "-s", "dist/spa" ]