FROM node:12.16.1

RUN apt update && apt upgrade -y && apt install jq

COPY . .

EXPOSE 8080

CMD [ "node", "server/index.js" ]
