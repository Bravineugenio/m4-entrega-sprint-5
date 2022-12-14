FROM node:16.15.1

WORKDIR /app

COPY ["package.json","yarn.lock"] .

RUN yarn

COPY . .

CMD ["yarn", "dev"]