module.exports = {
    entry: './src/main.js',
    output: './src/bundle.js',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' }
        ]
    }
};