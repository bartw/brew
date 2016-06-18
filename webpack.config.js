module.exports = {
    entry: './src/index.js',
    output: './src/bundle.js',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] } }
        ]
    }
};