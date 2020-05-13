FROM node:12.16.1

COPY . .

EXPOSE 8080

CMD [ "node", "server/index.js" ]
