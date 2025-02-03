FROM node:23-alpine3.20

WORKDIR /app

RUN npm install yarn

COPY package.json ./
COPY package-lock.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]