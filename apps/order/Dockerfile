FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

CMD ["pnpm", ""]