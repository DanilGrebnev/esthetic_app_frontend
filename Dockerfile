# FROM node:18-alpine

# WORKDIR /app

# COPY package.json ./

# RUN yarn --frozen-lockfile

# COPY . .
# # build:local for http://localhost:8000/api
# ENV MODE=production:local
# RUN yarn build:local

# # build:remote for https://postes.ru/api
# # ENV MODE=production:remote
# # RUN yarn build:remote

# ENV PORT=3000

# EXPOSE 3000

# CMD ["yarn", "start"]

# docker/dev.Dockerfile
FROM oven/bun:latest

WORKDIR /app/next-app

COPY package.json ./
# COPY bun.lockb ./

RUN bun install

COPY . .

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED=1

# for deploting the build version
ENV MODE=production:local
ENV LINT=false

RUN bun next build
# and
CMD bun next start

# OR for sart Next.js in development, comment above two lines and uncomment below line
# CMD bun run start
# Note: Don't expose ports here, Compose will handle that for us