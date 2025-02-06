FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN yarn --frozen-lockfile

COPY . .
# build:local for http://localhost:8000/api
ENV MODE=production:local
RUN yarn build:local

# build:remote for https://postes.ru/api
# ENV MODE=production:remote
# RUN yarn build:remote

ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]