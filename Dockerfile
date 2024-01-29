FROM node:lts

WORKDIR /root

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8888

CMD ["npm" "run" "build;" "node" "server" ]

