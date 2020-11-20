# Simple Blog Rest-API
This is a very simple Blog Rest-API using Typescript.

## How to run locally?

First, clone this project and install dependencies:
```
yarn install
```

Create database named ``simple-blog`` on local postgresql server. And then run migration:
```
sequelize db:migrate
```

Seed initial data:
```
sequelize db:seed:all
```

Open 2 terminal sessions. On first terminal run this:
```
yarn ts
```
And then this:
```
yarn dev
```

## Postman Collection
[Import Postman collection use this Link](https://www.getpostman.com/collections/0abe4723c82dc1672667/)
