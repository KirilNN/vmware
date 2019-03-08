# base image
FROM node:8.1.2-alpine

# copy
ADD ./src /usr/app/
ADD ./logs /usr/app/
ADD ./package.json /usr/app/
ADD ./tsconfig.json /usr/app/

WORKDIR /usr/app/

EXPOSE 8080

RUN npm prune
RUN npm install
