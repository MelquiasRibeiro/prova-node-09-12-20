FROM node:10

WORKDIR /usr/app

COPY . ./

RUN npm install

EXPOSE 3333

CMD npm run start