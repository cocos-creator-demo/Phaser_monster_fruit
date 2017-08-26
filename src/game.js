/**
 * Created by admin on 2017/8/26.
 */

let Phaser = require('Phaser');

let {width, height} = window.screen;

let game = new Phaser.Game(width, height, Phaser.AUTO, '#game');

module.exports = game;