FROM node:18-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install application dependencies
COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . ./

CMD ["yarn", "start"]

EXPOSE 3000