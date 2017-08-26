/**
 * Created by admin on 2017/8/26.
 */
let path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js"
    },
    externals: {
        'Phaser': 'Phaser'
    }

};