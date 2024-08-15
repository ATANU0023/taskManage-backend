<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Todo API 

### User SignUp and LogIn
### Auth functionality

1. SignUp
```
POST: http://localhost:3000/auth/signup

Body: {
  "firstName":"your-first-name",
  "lastName":"your-last-name",
  "email": "abc123@gmail.com",
  "password":"123445"
}

will return : "access_token":"exampletoken-23wfwfwe"

```

2. LogIn
```
POST: http://localhost:3000/auth/login

Body: {
  
  "email": "abc123@gmail.com",
  "password":"123445"
}


will return : "access_token":"exampletoken-23wfwfwe"

```

### CURD Todos

1. Create Todo
```
POST: http://localhost:3000/todo

Body: {
  
  "title": "task 1",
  "content":"this is task one"
}

Headers:
| Authorization | Bearer <access_token> | 

will return : {

  "id":"todo_id",
  "title":"task 1",
  "content":"this is task one",
  "complete": false,
  "userId": "user_id"

}
```


2. Get Todos
```
POST: http://localhost:3000/todo

Headers:
| Authorization | Bearer <access_token> | 

will return all todos : {

  "id":"todo_id",
  "title":"task 1",
  "content":"this is task one",
  "complete": false,
  "userId": "user_id"
  
}
```

3. Upate Todo by Id
```
PATCH: http://localhost:3000/todo/<:todoId>

Body: {
  
  "title": " updated task ",
  "content":"this is updated task"
}

Headers:
| Authorization | Bearer <access_token> | 

will return : {

  "id":"todo_id",
  "title":"updated task ",
  "content":"this is updated task",
  "complete": false,
  "userId": "user_id"
  
}
```

4. Upate Todo by Id
```
DELETE: http://localhost:3000/todo/<:todoId>

Headers:
| Authorization | Bearer <access_token> | 

will return the deleted todo: {

  "id":"todo_id",
  "title":"updated task ",
  "content":"this is updated task",
  "complete": false,
  "userId": "user_id"
  
}
```

### User functionality

1. Get the authenticated user
```
GET: http://localhost:3000/user/profile


will return the current user: {

"firstName": "first-name",
"lastName":"last-name",
"email": "provied email"
  
}
```

2. update user details
```
PATCH: http://localhost:3000/user/update

Body: all inputs are optional either user can change all or any of them{

  "firstName":"new-name",
  "lastName":"new-last-name",
  "password":"new-password"

}

Headers:
| Authorization | Bearer <access_token> | 

will return the updated user details: {

"email": "provied email"
"firstName": "new-first-name",
"lastName":"new-last-name",
  
}
```







