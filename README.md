# brew

## intro

This is a guide to build a simple app using Babel, REact and Webpack.

## hello world

We start of with a quick hello world.
Let's fire up a shell and start building.

```shell
mkdir brew
cd brew
git init
npm init
touch README.md
npm install --save-dev webpack webpack-dev-server
npm install --save react react-dom babel-preset-react babel-loader babel-core
touch .gitignore
touch webpack.config.js
mkdir src
touch src/main.js
touch src/index.html
touch .babelrc
```

Make sure we don't commit all those node modules by using the .gitignore file.

```
node_modules
```

In webpack.config.js we configure webpack to build all our js in one bundle.
We'll also tell webpack to use babel to do some magic.

```js
module.exports = {
    entry: './src/main.js',
    output: './src/bundle.js',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' }
        ]
    }
};
```

Babel needs to know we're doing react, we can confige this in the babelrc file.

```
{ "presets": ["react"] }
```

There's no need for a lot of html.
Just a div to serve as an entry point and our generated javascript bundle.

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
</head>

<body>
    <div id="app"></div>
    <script src="bundle.js"></script>
</body>

</html>
```

Our main.js file renders hello world in the app div.

```js
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('app')
);
```

To finish it of we need a script in our package.json to start the app.

```json
"scripts": {
    "start": "webpack-dev-server --progress -d --colors --config webpack.config.js --content-base src/"
}
```

Now we can use npm to start our app and browse to http://localhost:8080/ to see the results.

```shell
npm start
```

That went smooth. We can do our first commit.

```shell
git add .
git commit -m "hello world"
```