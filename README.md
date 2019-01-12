## Commands used to build:

```bash
$ node_modules/.bin/sequelize init
# update config/config.json
$ node_modules/.bin/sequelize model:generate --name User --attributes email:string,status:string,createdDateTime:date,gateCode:string
$ node_modules/.bin/sequelize model:generate --name Url --attributes destination:string,short:string,createdDateTime:date,updatedDateTime:date,status:string,userId:string
$ node_modules/.bin/sequelize db:migrate
$ node_modules/.bin/sequelize seed:generate --name seed-user
$ node_modules/.bin/sequelize seed:generate --name seed-url
$ node_modules/.bin/sequelize db:seed:all
```

## References:

- [stackabuse](https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/)
