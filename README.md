# lil - another url shortening service

lil is a URL shortening service built with the promise of
never saving any user-data. It uses random [captcha's](https://www.npmjs.com/package/svg-captcha) to validate users and a username of the user's choice to do user sessions.

An instance of it can be found over at [one0.xyz](https://www.one0.xyz/).

## Getting started

```
$ cp .env.example .env
$ sqlite3 lil.db < sql/000-all-tables.sql
$ npm i
$ npm start
```

Open http://localhost:3030.

