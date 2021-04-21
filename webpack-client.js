const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode !== 'production';

    return {
        devtool: isDevelopment ? 'source-map' : false,
        entry: './client/src/index.tsx',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, './public/static/dist')
        },
        watchOptions: {
          ignored: /node_modules/
        },
        plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].css'
        }),
        new CopyPlugin({
          patterns: [
            { from: './client/images', to: 'images' },
          ],
        })
        ],
        optimization: {
          minimizer: [
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: isDevelopment
            }),
            new OptimizeCSSAssetsPlugin({})
          ],
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                name: 'vendor'
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
          }
        },
        resolve: {
          extensions: [
            '*',
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.css',
            '.scss'
          ]
        },
        module: {
            rules: [
                {
                  test: /\.tsx?$/,
                  use: [
                    {
                      loader: 'awesome-typescript-loader',
                      options: {
                        transpileOnly: false
                      }
                    }
                  ]
                },
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                  test: /\.(sa|sc|c)ss$/,
                  use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                limit: 8000,
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jp(e*)g|svg|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                limit: 8000,
                                name: 'images/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        }
    }
};
