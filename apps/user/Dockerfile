FROM node:20-slim AS base 

ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:$PATH"

RUN corepack enable

COPY . /app
COPY ./apps/user/.env.example /app/apps/user/.env

WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile
RUN pnpm build user 

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD ["node", "/app/dist/apps/user/main"]