const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        shared: ['jquery'],
        index: './js/main.js',
        //signup: './js/signup.file.js',
        // login: './js/login-validation.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            favicon: './favicon.ico',
            template: 'src/index.html',
            minify: true,
            chunks: ['index'],
            scriptLoading: "defer",
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                exclude: /(node_modules|index.html)/,
                loader: 'html-loader',
                options: {
                    minimize: true,
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // {
            //     test: /\.file.js$/i,
            //     loader: 'file-loader',
            // },
            {
                test: /\.css$/,
                exclude: /\.file.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    }
};