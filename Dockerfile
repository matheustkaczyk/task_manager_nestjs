FROM node:16.15.0 as development

ENV secret=mysecret

WORKDIR /usr/src/api

COPY ./package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

RUN npm run build

FROM node:16.15.0 as production

WORKDIR /usr/src/api

COPY package*.json .

RUN npm install

COPY . .

COPY --from=development /usr/src/api/dist ./dist

CMD [ "node", "dist/main" ]
