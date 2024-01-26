FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8888

CMD ["parcel", "./index.html", "-p", "8888"]

