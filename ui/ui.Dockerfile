# base image
FROM node:9.6.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ui/package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY ./ui /usr/src/app

# start app
CMD ng serve --host 0.0.0.0
