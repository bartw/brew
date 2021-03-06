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
touch src/index.js
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
    entry: './src/index.js',
    output: './src/bundle.js',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' }
        ]
    }
};
```

Babel needs to know we're doing react, we can confige this in the babelrc file.

```json
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

Our index.js file renders hello world in the app div.

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

## es6

Since we're using babel already we can switch to es6.
Just install the babel presets for es6.

```shell
npm install --save-dev babel-preset-es2015
npm install --save babel-polyfill
```

Update the webpack.config.js to use the new presets.

```js
module.exports = {
    entry: './src/index.js',
    output: './src/bundle.js',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] } }
        ]
    }
};
```

Also update the babelrc file to use es6.

```json
{ "presets": ["es2015", "react"] }
```

And convert our index.js from es5 to es6.

```js
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('app')
);
``` 

## Managing state with redux

If our app becomes more complex we will need to manage state.
We'll try to use redux for this.
Let's do some setup first.

```shell
npm install --save redux react-redux
npm install --save-dev redux-devtools
mkdir src/actions
mkdir src/components
mkdir src/containers
mkdir src/reducers
touch src/actions/index.js
touch src/components/App.js
touch src/reducers/index.js
```

We'll make an app component in App.js to serve as the main component

```js
import React from 'react';

const App = () => (
    <div>
        hello from my app
    </div>
);

export default App;
```

And an empty reducer where we'll manage our state later in index.js in the reducers folder.

```js
const myApp = (state = {}, action) => {
    return state;
};

export default myApp;
```

Now we update our main index.js to use our component and reducer.

```js
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import myApp from './reducers';
import App from './components/App';

let store = createStore(myApp);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
```

## Input and display

We're going to make a list of class groups.
When you add a new class group it gets added to the list.

```shell
touch src/reducers/classGroups.js
touch src/containers/AddClassGroup.js
touch src/containers/ClassGroupList.js
touch src/components/ClassGroups.js
touch src/components/ClassGroup.js
```

src/index.js

```js
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import brewApp from './reducers';
import App from './components/App';

let store = createStore(brewApp);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

```

src/actions/index.js

```js
let nextClassGroupId = 0;

export const addClassGroup = (name) => {
    return {
        type: 'ADD_CLASSGROUP',
        id: nextClassGroupId++,
        name
    };
};
```

src/components/App.js

```js
import React from 'react';
import AddClassGroup from '../containers/AddClassGroup';
import ClassGroupList from '../containers/ClassGroupList';

const App = () => (
    <div>
        <AddClassGroup />
        <ClassGroupList />
    </div>
);

export default App;
```

src/components/ClassGroup.js

```js
import React, { PropTypes } from 'react';

const ClassGroup = ({ name }) => (
    <li>
        {name}
    </li>
);

ClassGroup.propTypes = {
    name: PropTypes.string.isRequired
};

export default ClassGroup;
```

src/components/ClassGroups.js

```js
import React, { PropTypes } from 'react';
import ClassGroup from './ClassGroup';

const ClassGroups = ({ classGroups }) => (
    <ul>
        {classGroups.map(classGroup =>
            <ClassGroup
                key={classGroup.id}
                {...classGroup}
                />
        ) }
    </ul>
);

ClassGroups.propTypes = {
    classGroups: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default ClassGroups;
```

src/containers/AddClassGroup.js

```js
import React from 'react';
import { connect } from 'react-redux';
import { addClassGroup } from '../actions';

let AddClassGroup = ({ dispatch }) => {
    let input;

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(addClassGroup(input.value))
                input.value = ''
            } }>
                <input ref={node => {
                    input = node
                } } />
                <button type="submit">
                    Add Class Group
                </button>
            </form>
        </div>
    );
};

AddClassGroup = connect()(AddClassGroup);

export default AddClassGroup;
```

src/containers/ClassGroupList.js

```js
import { connect } from 'react-redux';
import ClassGroups from '../components/ClassGroups';

const mapStateToProps = (state) => {
    return {
        classGroups: state.classGroups
    };
};

const ClassGroupList = connect(
    mapStateToProps
)(ClassGroups);

export default ClassGroupList;
```

src/reducers/classGroups.js

```js
const classGroup = (state, action) => {
    switch (action.type) {
        case 'ADD_CLASSGROUP':
            return {
                id: action.id,
                name: action.name
            };
        default:
            return state;
    }
};

const classGroups = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CLASSGROUP':
            return [
                ...state,
                classGroup(undefined, action)
            ];
        default:
            return state;
    }
};

export default classGroups;
```

src/reducers/index.js

```js
import { combineReducers } from 'redux';
import classGroups from './classGroups';

const brewApp = combineReducers({
    classGroups
});

export default brewApp;
```