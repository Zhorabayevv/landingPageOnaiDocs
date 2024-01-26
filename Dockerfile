FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install -g gulp-cli
RUN npm install

COPY . .

EXPOSE 8888

CMD ["gulp"]

