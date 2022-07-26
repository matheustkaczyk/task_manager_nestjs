FROM node:16.15.0-alpine as development

WORKDIR /usr/src/api

COPY ./package*.json ./

RUN npm install

EXPOSE 3000

ENV PORT=3000

ENV DB=mongodb+srv://tkaczyk:tkaczyk2022@cluster0.ljthc.mongodb.net/workspace?retryWrites=true&w=majority

ENV secret=mysecret

COPY . .

RUN npm run start
