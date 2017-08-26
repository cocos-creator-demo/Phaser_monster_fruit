/**
 * Created by admin on 2017/8/26.
 */

let game = require('./game');

let preload = function () {
    
    function loading() {
        // 加载动画
        // 由于文件是异步加载，因此这里的资源文件是在boot场景中就开始加载的
        let preloadSprit = game.add.sprite(game.world.centerX, game.world.centerY+40, 'loading');
        preloadSprit.anchor.setTo(0.5);
        game.load.setPreloadSprite(preloadSprit);

        // 加载进度
        let progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
            fontSize: '60px',
            fill: '#ffffff'
        });

        progressText.anchor.setTo(0.5, 0.5);
        game.load.onFileComplete.add(function (progress) {
            progressText.text = progress + '%';
        });
        game.load.onLoadComplete.add(onLoad);
        // let deadLine = false;
        let deadLine = true;

        setTimeout(function () {
            deadLine = true;
        }, 1000);

        function onLoad() {
            if (deadLine) {
                // 已到达最小展示时间，可以进入下一个场景
                goToNext();
            } else {
                // 还没有到最小展示时间，1秒后重试
                setTimeout(onLoad, 1000);
            }
        }
    }
    function goToNext() {
        game.state.start('welcome');
    }

    function loadAssets() {
        // 加载游戏资源
        game.load.crossOrigin = 'anonymous'; // 设置跨域
        game.load.image('bg', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/bg.png');
        game.load.image('dude', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/dude.png');
        game.load.image('green', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/green.png');
        game.load.image('red', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/red.png');
        game.load.image('yellow', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/yellow.png');
        game.load.image('bomb', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/bomb.png');
        game.load.image('five', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/five.png');
        game.load.image('three', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/three.png');
        game.load.image('one', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/one.png');
        game.load.audio('bgMusic', '//24haowan-cdn.shanyougame.com/pickApple2/assets/audio/bgMusic.mp3');
        game.load.audio('scoreMusic', '//24haowan-cdn.shanyougame.com/pickApple2/assets/audio/addscore.mp3');
        game.load.audio('bombMusic', '//24haowan-cdn.shanyougame.com/pickApple2/assets/audio/boom.mp3');
    }

    this.preload = function () {
        loading();
        loadAssets();
    };

    // 由于这里设置了最小1秒钟的展示时间，因此就不再create生命函数中设置跳转了
    // this.create = function () {
    //     goToNext()
    // }
};


module.exports = preload;