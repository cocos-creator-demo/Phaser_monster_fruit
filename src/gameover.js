/**
 * Created by admin on 2017/8/27.
 */

let game = require('./game');

let gameover = function () {
    this.create = function () {
        alert('gameover');
    }
};

module.exports = gameover;