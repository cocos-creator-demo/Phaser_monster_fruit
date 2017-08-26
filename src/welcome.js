/**
 * Created by admin on 2017/8/26.
 */
let game = require('./game');

// 这里会报 this._unlockSource.noteOn is not a function
// 教程使用2.6的版本不会报错
let welcome = function () {
    const {width, height} = game;

    let background,
        player,
        tips,
        title;

    let setBackground = ()=>{
        background = game.add.image(0, 0, 'bg');
        background.width = width;
        background.height = height;
    };

    let setTitle = ()=>{
        title = game.add.text(game.world.centerX, height * 0.25, '小恐龙接苹果', {
            fontSize: "20px",
            fontWeight: 'bold',
            fill: '#f2bb15'
        });
        title.anchor.setTo(0.5);
    };

    let setTips = ()=>{
        tips = game.add.text(game.world.centerX, height * 0.5, '点击屏幕开始游戏', {
            fontSize: "20px",
            fontWeight: 'bold',
            fill: '#f2bb15'
        });

        tips.anchor.setTo(0.5);
        tips.scale.setTo(0.3);
        // 这里实现连续的补间动画
        // game.add.tween(tips.scale)
        //     .to({x: 0.4, y: 0.4}, 600, Phaser.Easing.Linear.None, true)
        //     .to({x: 0.3, y: 0.3}, 600, Phaser.Easing.Linear.None, true).loop(true);
    };

    let setPlayer = ()=>{
        player = game.add.sprite(game.world.centerX, height, 'dude');

        player.anchor.setTo(0.5, 1);
    };

    let startGame = ()=>{
        game.input.onTap.add(function () {
            game.state.start('play');
        }, this)
    };

    this.create = function () {
        setBackground();
        setTitle();
        setTips();
        setPlayer();
        startGame();
    }
};

module.exports = welcome;