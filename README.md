# lil - another url shortening service

## What is lil?

lil is a URL shortening service built with the promise of
never saving any user-data. It uses random [captcha's](https://www.npmjs.com/package/svg-captcha) to validate users and a username of the user's choice to do user sessions.

An instance of it can be found over at [one0.xyz](https://www.one0.xyz/).

## Let's be upfront

- I thought [sqlite3](https://sqlite.org/index.html) and [sequelize](http://docs.sequelizejs.com/) looked cool, so I tried
  building a project with them.
- The codebase is a joke. Seriously! it's toxic. I'm planning to do a revamp in the coming days. But don't let that stop you from taking a hammer to the code.
- There is also a big TODO section, that I'm too ashamed to publish. The only reason why I published this, is so that I can feel good about myself for building a project in 2 days.
- Oh! You're still here? Wow! thank you ... read on.

## The stack

- Sqlite3
- Nodejs
- Vue.js (I tried doing this with vanilla JS. but it made everything even more worse.)

## Commands used to build

```bash
$ node_modules/.bin/sequelize init
# update config/config.json
$ node_modules/.bin/sequelize model:generate --name User --attributes email:string,status:string,gateCode:string
$ node_modules/.bin/sequelize model:generate --name Url --attributes destination:string,short:string,status:string
$ node_modules/.bin/sequelize db:migrate
$ node_modules/.bin/sequelize seed:generate --name seed-user
$ node_modules/.bin/sequelize seed:generate --name seed-url
$ node_modules/.bin/sequelize db:seed:all
```

## Run

```bash
$ git clone https://github.com/aktsbot/lil ./lil
$ cd lil
$ npm install
$ node_modules/.bin/sequelize db:migrate
$ npm start # for development
$ # OR
$ NODE_ENV="production" node_modules/.bin/sequelize db:migrate
$ JWT_SECRET="mw4h4h4" NODE_ENV="production" npm start # for production
```

## References

- [stackabuse](https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/)
- [duringthedrive](https://www.duringthedrive.com/2017/05/06/models-migrations-sequelize-node/)
- [pwa guide](https://medium.com/hicode/beginners-guide-to-converting-a-javascript-app-to-a-progressive-web-app-pwa-7682eded0f30)

## Contributors

- [safaldas](https://github.com/safaldas)
- [aktsbot](https://github.com/aktsbot)
