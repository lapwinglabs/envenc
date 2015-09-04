
# envenc

  The 1Password for development environment variables.

  Seamlessly encrypt and decrypt your development keys in your `.env`.

## Installation

```bash
npm install envenc
```

## Usage

1. Install: `npm install envenc`
2. Create: `.env` file and add your keys. Add this file to your `.gitignore`
3. Add: `export SOME_SECRET=...` to your `~./bash_profile`. Share this key with other developers.
4. Encrypt: `.env` file with envenc: `./node_modules/.bin/envenc $SOME_SECRET`
5. Commit: `.env.enc` to source control
6. Include: `require('envenc')(process.env.SOME_SECRET)` at the top of your application

**Important:** This is not for your production enviroment. You should store those keys on your server. This is specifically for sharing development keys with other developers.

**Optional:** There is also support for a `.env.local` file. This is meant for local modifications and will overwrite anything in the `.env`. You should also put this in your `.gitignore` file

## Motivation

- Based on: [Keeping Passwords in Source Control](http://ejohn.org/blog/keeping-passwords-in-source-control/)
- Inspired by: https://github.com/jed/config-leaf

## When you should you decrypt and encrypt?

**Decrypt:** At the top of your application:

```js
require('envenc')(process.env.SOME_SECRET)
```

**Encrypt:** When you commit

```bash
./node_modules/.bin/envenc $SOME_SECRET
```

You should do this using a `pre-commit` hook. Use [husky](https://github.com/typicode/husky).

## License

MIT
