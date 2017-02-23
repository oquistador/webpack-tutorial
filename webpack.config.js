const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const packageData = require('./package');

const THEME = process.env.THEME || 'light';

const BUILD_PROPERTIES = {
    version: packageData.version
};

const extractCSS = new ExtractTextPlugin('app.css');

const optimizeChunks = new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
});

const definitions = new webpack.DefinePlugin({
    BUILD_PROPERTIES: JSON.stringify({
        NAME: packageData.name,
        VERSION: packageData.version,
        THEME: THEME
    })
});

const replaceTheme = new webpack.NormalModuleReplacementPlugin(/\.THEME\./, resource => {
    resource.request = resource.request.replace(/\.THEME\./, `.${THEME}.`);
});

const htmlEntry = new HtmlPlugin({
    hash: true,
    title: packageData.name,
    favicon: path.join(__dirname, 'src/assets/favicon.ico'),
    template: path.join(__dirname, 'src/index.ejs')
});

const copyFiles = new CopyPlugin([{
    from: './src/assets/MESSAGE.md'
}]);

module.exports = {
    entry: {
        app: './src/app',
        vendor: [
            'angular'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'ng-annotate-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },

            {
                test: /\.html$/,
                use: [
                    'ngtemplate-loader',
                    'html-loader'
                ]
            },

            {
                test: /\.s?css$/,
                loader: extractCSS.extract([
                    'css-loader?sourceMap',
                    'sass-loader?sourceMap'
                ])
            },

            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name]_[hash:7].[ext]'
                }
            }
        ]
    },

    devtool: 'source-map',

    plugins: [
        extractCSS,
        optimizeChunks,
        htmlEntry,
        copyFiles,
        definitions,
        replaceTheme
    ],

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
    }
};
