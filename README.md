# yosay [![Build Status](https://travis-ci.org/yeoman/yosay.svg?branch=master)](https://travis-ci.org/yeoman/yosay)

> Tell Yeoman what to say.


## Install
```bash
$ npm install --save yosay
```


## Usage
```javascript
var yosay = require('yosay');

yosay('Hello, and welcome to my fantastic generator full of whimsy and bubble gum!');

/*
     _-----_
    |       |    .--------------------------.
    |--(o)--|    | Hello, and welcome to my |
   `---------´   | fantastic generator full |
    ( _´U`_ )    |   of whimsy and bubble   |
    /___A___\    |           gum!           |
     |  ~  |     '--------------------------'
   __'.___.'__
 ´   `  |° ´ Y `
 */
```


## CLI
```bash
$ npm install --global yosay
$ yosay --help

Tell Yeoman what to say.

Usage
  $ echo <string> | yosay
  $ echo <string> | yosay --maxLength 8

Example
  $ echo "Sindre is a horse" | yosay

     _-----_
    |       |    .--------------------------.
    |--(o)--|    |     Sindre is a horse    |
   `---------´   '--------------------------'
    ( _´U`_ )
    /___A___\
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
```


## License
[BSD license](http://opensource.org/licenses/bsd-license.php)
Copyright (c) Google
