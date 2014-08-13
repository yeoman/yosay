# yosay [![Build Status](https://travis-ci.org/yeoman/yosay.svg?branch=master)](https://travis-ci.org/yeoman/yosay)

> Tell Yeoman what to say

Like [cowsay](http://en.wikipedia.org/wiki/Cowsay), but less cow.

![](screenshot.png)


## Install

```sh
$ npm install --save yosay
```


## Usage

```js
var yosay = require('yosay');

console.log(yosay('Hello, and welcome to my fantastic generator full of whimsy and bubble gum!'));

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

*You can style your text with [chalk](https://github.com/sindresorhus/chalk) before passing it to `yosay`.*


## CLI

```
$ npm install --global yosay
```

```
$ yosay --help

  Usage
    yosay <string>
    yosay <string> --maxLength 8
    echo <string> | yosay

  Example
    yosay 'Sindre is a horse'

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
