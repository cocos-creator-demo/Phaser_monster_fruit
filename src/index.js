/**
 * Created by admin on 2017/8/26.
 * 参考 https://segmentfault.com/a/1190000009212221 的Phaser练习
 */
let game = require('./game');

let boot = require('./boot');
let preload = require('./preload');
let welcome = require('./welcome');
let play = require('./play');
let gameover = require('./gameover');


let states = {
    preload,
    boot,
    welcome,
    play,
    gameover
};

for (let key in states){
    if (states.hasOwnProperty(key)){
        game.state.add(key, states[key]);
    }
}

game.state.start("boot");
