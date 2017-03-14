# React-Toastr

create-react-app + React + Redux

Demo: http://flymaple.github.io/react-toastr/

## Install

npm install -g create-react-app
create-react-app demo
cd demo
npm install classnames --save
npm install --save eventemitter3 
download components/Toastr into components/

## Dependency

* react
* redux
* react-redux
* eventemitter3
  * https://github.com/primus/eventemitter3
* classnames
  * https://github.com/JedWatson/classnames
* animate.css
  * https://github.com/daneden/animate.css
  * https://daneden.github.io/animate.css/
* Material.io
  * https://material.io

## Using

``` JS
    import Toastr, { toastr } from './Toastr'

    <Toastr />

    // or

    <Toastr timeout={ 5000 } position="top-right" progress={ true } transitionIn="bounceIn" transitionOut="bounceOut" />
```

* position: `top-right | top-left | bottom-right | bottom-left`
* transitionIn / transitionOut: https://github.com/daneden/animate.css

## Refs

* react-redux-toastr
  * https://github.com/diegoddox/react-redux-toastr
  * http://diegoddox.github.io/react-redux-toastr/
* react-syntax-highlighter
   * https://github.com/conorhastings/react-syntax-highlighter
   * http://conor.rodeo/react-syntax-highlighter/demo/