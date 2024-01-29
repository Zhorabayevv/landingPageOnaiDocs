FROM node:lts

WORKDIR /landing

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8888

CMD ["npm", "start"]

