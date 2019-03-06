FROM node:8.1.2-alpine

RUN rm -rf /usr/app/node_modules

ADD ./src /usr/app/
ADD ./logs /usr/app/
ADD ./data /usr/app/

ADD ./package.json /usr/app/
ADD ./tsconfig.json /usr/app/

WORKDIR /usr/app/

EXPOSE 8080

RUN npm prune
RUN npm install