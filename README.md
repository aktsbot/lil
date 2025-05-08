# lil - another url shortening service

lil is a URL shortening service built with the promise of
never saving any user-data. It uses random [captcha's](https://www.npmjs.com/package/svg-captcha) to validate users and a username of the user's choice to do user sessions.

An instance of it can be found over at [one0.xyz](https://www.one0.xyz/).

The [old branch](https://github.com/aktsbot/lil/tree/old) has the vue+sequelize codebase.

## Getting started

```
$ cp .env.example .env
$ sqlite3 lil.db < sql/000-all-tables.sql
$ npm i
$ npm start
```

Open http://localhost:3030.

## Extras

1. Using lil from your terminal

    Have `curl` installed on your machine. Then copy over `extras/lil` to somewhere
    in your `$PATH`.

    ```
    $ cp extras/lil ~/bin
    $ # usage
    $ lil "https://www.warp.dev/pricing"
    $ lil "https://www.warp.dev/pricing" warp
    ```

    To add your `~/bin` in your `$PATH`, put this in your `~/.profile` file

    ```sh
    [ -d $HOME/bin ] && export PATH="${HOME}/bin:${PATH}"
    ```

2. There is a sample `nginx` config in the `extras` folder.
