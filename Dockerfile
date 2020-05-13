FROM node:12.16.1

COPY /var/www/nodes/dev .

EXPOSE 8080

CMD [ "node", "server.js" ]
