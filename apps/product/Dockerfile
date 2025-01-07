FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm build order

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm i --prod

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/apps/product/main"]