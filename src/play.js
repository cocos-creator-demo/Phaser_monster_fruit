/**
 * Created by admin on 2017/8/26.
 */

let game = require('./game');
let Phaser = require('Phaser');

// 为了防止精灵变形
function getAdjustSprite(x, y, key, width, gameGroup) {
    let sprite;
    if (gameGroup) {
        sprite = gameGroup.create(x, y, key);
    }else {
        sprite = game.add.sprite(x, y, key);
    }

    let img = game.cache.getImage(key);
    sprite.width = width;
    sprite.height = width / img.width * img.height;

    return sprite;
}

let play = function () {
    const {width, height} = game;

    let gameSpeed = 200;
    // 感觉设置背景和初始化角色的代码与weclome场景有些重复了
    let background,

        player, // 角色
        fruitGroup, // 水果组

        score = 0,
        scoreTitle,
        scoreMusic,
        bombMusic;

    this.preload = function () {
        scoreMusic = game.add.audio('scoreMusic');
        bombMusic = game.add.audio('bombMusic');
    };

    let setBackground = ()=>{
        background = game.add.image(0, 0, 'bg');
        background.width = width;
        background.height = height;
    };

    let setPlayer = ()=>{
        player = game.add.sprite(game.world.centerX, height, 'dude');
        player.anchor.setTo(0.5, 1);

        // 为了使用碰撞检测，这里需要开启精灵的physics
        game.physics.enable(player);
        player.body.allowGravity = false;
        movePlayer();
    };
    function movePlayer() {
        // 移动角色
        let touching = false;
        // 主要是为了方式角色瞬移
        game.input.onDown.add(function (pointer) {
            if (Math.abs(pointer.x - player.x) < player.width/2) {
                touching = true;
            }
        });
        game.input.onUp.add(function () {
            touching = false;
        });
        game.input.addMoveCallback(function (pointer, x, y, isTap) {
            if (!isTap && touching) {
                player.x = x
            }
        })
    }

    let setScoreTitle = ()=>{
        scoreTitle = game.add.text(game.world.centerX, height*0.2, `得分：${score}`);
        scoreTitle.anchor.setTo(0.5);
    };

    let setScore = (score)=>{
        scoreTitle.text = `得分：${score}`;
    };

    let createFruit = ()=>{
        fruitGroup = game.add.group();
        // game.physics.enable(fruitGroup);
        // 随机水果类型
        function getType() {
            let types = ['green', 'red', 'yellow', 'bomb'],
                index = Math.floor(Math.random()*types.length);
            return types[index];
        }

        let timer = game.time.create(true);
        timer.loop(1000, function () {
            // 0.8是修正系数，防止苹果出现在屏幕外，没有具体处理细节了
            let x = Math.random()*width*0.8,
                y = 0,
                type = getType();

            let fruit = getAdjustSprite(x, y, type, game.world.width/8, fruitGroup);
            game.physics.enable(fruit);

            // 检测世界边界碰撞
            fruit.body.collideWorldBounds = true;
            fruit.body.onWorldBounds = new Phaser.Signal();
            fruit.body.onWorldBounds.add(function(fruit, up, down, left, right) {
                if (down) {
                    fruit.kill();
                    // if (fruit.key !== 'bomb') game.state.start('over', true, false, score);
                }
            });
        }, this);
        timer.start();
        startPhysics();
    };

    function startPhysics() {
        game.physics.startSystem(Phaser.Physics.Arcade);
        game.physics.arcade.gravity.y = gameSpeed;
    }

    this.create = function () {
        setBackground();
        setPlayer();
        setScoreTitle();

        // 随机出现水果
        createFruit();
    };

    // 场景每帧都会执行的计算
    function pickFruit(player, fruit){
        let key = fruit.key;
        if(key === 'bomb') {
            bombMusic.play();
            gameover();
        }else {
            // 得分
            let point = 1,
                img = 'one';
            if (key === 'red'){
                point = 3;
                img = 'three';
            }else if(key === 'yellow'){
                point = 5;
                img = 'five'
            }
            let goal = getAdjustSprite(fruit.x, fruit.y, img, fruit.width);
            goal.alpha = 0;

            let showTween = game.add.tween(goal).to({
                alpha: 1,
                y: goal.y - 20
            }, 100, Phaser.Easing.Linear.None, true);

            showTween.onComplete.add(function () {
                let hideTween =game.add.tween(goal).to({
                    alpha: 0,
                    y: goal.y - 20
                }, 100, Phaser.Easing.Linear.None, true);

                hideTween.onComplete.add(function () {
                    goal.kill();
                });
            });

            // todo 这里貌似不能用chain的形式
            // showTween.chain(hideTween);
            fruit.kill();

            score++;
            setScore(score);
        }
    }

    function gameover() {
        // todo
        game.state.start('gameover');
    }

    this.update = function () {
        // 检测角色与元素的碰撞
        game.physics.arcade.overlap(player, fruitGroup, pickFruit, null, this);
    }
};

module.exports = play;