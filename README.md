# cu-api

[![npm
version](https://badge.fury.io/js/cu-api.svg)](https://badge.fury.io/js/cu-api)
[![Build Status](https://travis-ci.com/kpfromer/cu-api.svg?branch=master)](https://travis-ci.com/kpfromer/cu-api)

## Disclaimer

This project was created by me (Kyle Pfromer) and has **no endorsement by the University of Colorado.**

## Installation

`npm install --save cu-api`

`yarn add cu-api`

## Usage

The api code is written with TypeScript, but also works with JavaScript (typings
are included).

Create a session and login. Then get all the data you need with the session
(the session acts as a logged in user, saving time).

### ES6

```javascript
import { CUSession } from 'cu-api';

(async function () {
  const session = new CUSession();
  await session.init('username', 'password');
  console.log(session.loggedIn);
  console.log(await session.userData());
  console.log(await session.termData());
  console.log(await session.GPA());
  console.log(await session.classTermData('2201'));
})();
```

### ES5

```javascript
const CUSession = require('cu-api').CUSession;

(async function () {
  const session = new CUSession();
  await session.init('username', 'password');
  console.log(session.loggedIn);
  console.log(await session.userData());
  console.log(await session.termData());
  console.log(await session.GPA());
  console.log(await session.classTermData('2201'));
})();
```

## How it Works

`cu-api` uses `superagent` a http request library to act like a user and login
(the CU login process is really convoluted). When logged in it accesses the
backend API used by the `buffportal` Angular application to grab the data you
need. You have access to everything the `buffportal` has access to!

## Requirements

You must have nodejs installed. This **will not work** on the browser since I had to self sign a certificate for `buffportal`.

## License

`cu-api` is [MIT licensed](LICENSE).
