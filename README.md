## How to run it
 - execute `docker-compose up` and 
 - the API will run on `:8080` port, 
 - and the UI on `:4200`
 - user `test@vmare.com` and password `123123` to login

## What is currently supports? 

- **Swagger-UI** 
- **Status Monitor**
- **.env files support**
- **nodemon for hot-reload**
- **Pretty Console Logger with Winston** 
- **Work with Yarn or NPM 6 as dependency resolvers**
- **Code formatting with Prettier as hook for Pre-commit**
- **Dockerfile + docker-compose for development**
- **Coverage Report**

## Requirements

* NodeJS 9 +
* Docker

## How to use it? 

1. Visit [http://localhost:8080/documentation](http://localhost:8080/documentation) to view swagger docs.
2. Visit [http://localhost:8080/status](http://localhost:8080/status) to view the status monitor.


## TODO

This is not finished, there's still a lot of things to improve. Here you got some:

- [ ] Add better test coverage for both UI and API
- [ ] Remove keys in source control
- [ ] Add production Docker configuration
- [ ] Add support for Jenkins pipeline
- [ ] Fix bugs - there are always bugs that need to be fixed

## Documentation

### What are the package.json scripts for?

* `build-ts`: Compiles typescript based on config set in tsconfig.json.
* `start`: Starts node with the compiled typescript. Used by eg. Heroku.
* `docker:logs`: View Docker logs
* `docker:ps`: List Docker containers
* `docker:start`: Start Docker container based on docker-compose.yml file.
* `docker:stop`: Stop Docker container
* `nodemon:build`: Starts the Nodemon using ts-node. No need to compile beforehand.
* `nodemon:start`: Same as nodemon:build
* `format:lint`: Runs tslint on the typescipt files, based on tslint.js settings.
* `format:prettier`: Runs prettier on all ts-files.
* `postinstall`: Runs build-ts script. This is used by eg. Heroku automatically.
* `test`: Runs tests using nyc, and creates coverage report.

## License
Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/typescript-hapi-starter/blob/master/LICENSE) for more information
