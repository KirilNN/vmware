# base image
FROM node:9.6.1

# copy
ADD ./server/src /usr/server/app
ADD ./server/logs /usr/server/app
ADD ./server/package.json /usr/server/app
ADD ./server/tsconfig.json /usr/server/app

WORKDIR /usr/server/app

EXPOSE 8080

RUN npm prune
RUN npm install
RUN npm i -g nodemon

