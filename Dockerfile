FROM node:18

RUN apt-get update

WORKDIR /usr/src/app

COPY /package*.json . 

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]