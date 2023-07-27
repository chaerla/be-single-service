## Description

This is a single service backend for OHL LABPRO 2023. This service can be used alongside this [frontend](https://github.com/rifqi2320/OHL-FE) app. This service implements simple REST API for Item, Company, and User.

## Author
**13521044 Rachel Gabriela Chen**

## Initialization

- Copy `.env.example` into `.env` and fill with your local env variables.

## Installation

```bash
$ yarn install
```

## Running the app

### local
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

### with docker
```bash
$ docker-compose up -d
```

### Go to `/api/docs` to test the API or use the frontend app
### Login using username: admin password: admin
![image](https://github.com/chaerla/be-single-service/assets/91037907/76d18e2e-cf69-48bf-b8d1-87b8edce7ec6)


## Design Patterns
### Dependency Injection (DI) Pattern
Services and other classes are defined as providers, are injected into the controllers that need them
### Singleton pattern
Providers (services and controllers) are created as singleton. This pattern ensures that the state is consistent across the application, and resources are efficiently managed.
### Decorator pattern
Decorators are used to mark classes as controllers, services, modules, etc., and to specify routes, middleware, guards, and other features. The decorator pattern allows for a clean and declarative way to extend and modify the behavior of components without modifying their core implementation. It is also used to add the messages to the response data.

## Tech Stack
- NodeJS v18.16.1
- NestJS framework
- PostgresSQL

## Endpoints
![image](https://github.com/chaerla/be-single-service/assets/91037907/930ed940-2b39-4a19-8f2c-b5c2d1f677ff)
![image](https://github.com/chaerla/be-single-service/assets/91037907/502f9d68-10bf-4c21-998c-703354530b2a)

## Bonus
### B03 - Single Service Implementation (using Typescript)
### B07 - Dokumentasi API
Documented with swagger (access through `localhost:3000/api/docs`)

