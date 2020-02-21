# SocketIO server developers notes
Simple socketIO server with mocha test, jshint and Redis authentication.
Create for learning purposes

INFO FLAGS 
------------
🙏*N - Can replace each other

🔥 - Complexity level  

INSTALLATION REQUIREMENTS
------------
  - [NodeJS server](https://nodejs.org/) version > 12 🔥
  - [NPM](https://nodejs.org/en/download/) version > 6 🔥 🙏*2
  - [YARN](https://yarnpkg.com/) 🔥🔥 🙏*2
  - [PM2](https://www.npmjs.com/package/pm2) 🔥
  - [Docker](https://www.docker.com/) 🔥🔥
  - [Redis image](https://hub.docker.com/_/redis/) version > 5.0 🙏*1 🔥🔥🔥
  - [Redis package](https://hub.docker.com/_/redis/) version > 5.0 🙏*1 🔥
  - [Redis-tools package](https://redis.io/topics/rediscli) 🔥

ENV PREPARATION 
------------
1. Install nodeJS and npm 🔥
2. Install Docker 🔥🔥
3. Install pm2 package globally(sudo required) 🔥
```sh
npm install pm2 -g
```

REDIS START
------------
1. Via docker-compose 🙏*1 🔥🔥
2. Via docker run command 🙏*1 🔥🔥🔥
```
docker run -d --name redis -p 6379:6379 redis
```
3. Via package 🔥
4. Install redis-tools package 🔥
DEPENDENCY INSTALL
------------
1. Via npm 🙏*2 🔥
```
npm install
```
2. Via yarn 🙏*2 🔥
```
yarn install
```

CONFIGURATION 
------------
1. All env config can be found in config folder
2. Default should not be changed use [local file](https://github.com/lorenwest/node-config/wiki/Configuration-Files#file-load-order) instead
3. Port should be unique for all servers
4. Var env should be prod for master branch
5. Var env should be develop for dev branch
6. Var env should be test for feature/* branchs
7. Var env should replace %ENV% in file ecosystem.config.js

SERVER START
------------
0. Clear redis keys if required
```
redis-cli KEYS "%env%*" | xargs redis-cli DEL
```
Where %env% is env var from config

1. Via pm2 🙏*1 🔥🔥
```
pm2 start
```
2. Via npm 🙏*1 🔥
```
npm run server
```
3. Via nodejs 🙏*1 🔥
```
node --inspect ./server
```

CODE QUALITY TOOLS
------------
1. Npm run linter 🙏*1 🔥
```
npm run linter
```
2. Npm run tests and coverage  🙏*1 🔥
```
npm run test
```