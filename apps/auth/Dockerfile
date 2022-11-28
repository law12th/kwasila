FROM node:alpine AS builder

WORKDIR /usr/app

RUN yarn global add turbo

COPY ./ ./

RUN turbo prune --scope=auth --docker

FROM node:alpine AS installer

WORKDIR /usr/app

COPY .gitignore .gitignore
COPY --from=builder /usr/app/out/json/ .
COPY --from=builder /usr/app/out/yarn.lock ./yarn.lock

RUN yarn install

COPY --from=builder /usr/app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=auth...

FROM node:alpine AS runner

WORKDIR /usr/app

RUN yarn global add pm2
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system -uid 1001 expressjs

USER expressjs

COPY --from=installer /usr/app .

CMD pm2-runtime usr/apps/auth/build/index.js