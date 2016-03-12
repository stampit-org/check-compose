# check-compose
Command line tool to test your ['compose' function implementation](https://github.com/stampit-org/stamp-specification)

## Install

```sh
$ npm i check-compose -g
```

## Usage

### Command line

ES5:
```sh
$ check-compose path/to/compose.js
```

ES6 using `babel-node`:
```sh
$ npm i check-compose
$ babel-node ./node_modules/.bin/check-compose path/to/compose.js
```

### Programmatically

```js
import checkCompose from 'check-compose';
checkCompose(myComposeFunction);
```
