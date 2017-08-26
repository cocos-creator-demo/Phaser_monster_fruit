/**
 * Created by admin on 2017/8/26.
 */
let game = require('./game');

let boot = function () {
    this.preload = function () {
        // if(!game.device.desktop){//移动设备适应
        //     this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //     this.scale.forcePortrait = true;
        //     this.scale.refresh();
        // }
        game.load.image('loading','assets/preloader.gif');
    };

    this.create = function(){
        game.state.start('preload'); //跳转到资源加载页面
    };
};

module.exports = boot;