FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN yarn --frozen-lockfile

COPY . .

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NEXT_SHARP_PATH=/tmp/node_modules/sharp

# uncomment bottom lines, if need use for http://localhost:8000/api
ENV MODE=production:local
RUN yarn build:local

# uncomment bottom lines, if need use https://postes.ru/api
# ENV MODE=production:remote
# RUN yarn build:remote

ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]