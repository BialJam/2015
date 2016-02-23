Ftank.Goku = function (game, x, y) {
    Phaser.Group.call(this, game);

    this.cursors;
    this.top;
    this.side = 'stay';
    this.lx;
    this.rx;

    this.path = 'center';
    this.actPos = 'run';

    this.nextPos = 0;
    this.posRate = 1000;
    this.restRate = 400;

    this.build(x, y);

    return this;
};

Ftank.Goku.prototype = Object.create(Phaser.Group.prototype);
Ftank.Goku.prototype.constructor = Ftank.Goku;

Ftank.Goku.prototype.build = function (x, y) {

    this.enableBody = true;

    this.top = this.game.add.sprite(x, y, 'goku');
    this.top.animations.add('stand', [0, 1], 4, true);
    this.top.animations.add('jump', [1], 10, true);
    this.top.animations.add('slide', [2, 3, 4, 5, 6, 7], 10, true);
    this.top.animations.add('left', [0], 10, true);
    this.top.animations.add('right', [1], 10, true);

    this.game.physics.enable(this.top, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.top);

    this.top.anchor.setTo(0.5, 0.5);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.leftBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}

Ftank.Goku.prototype.update = function () {

    this.top.bringToTop();
    this.top.body.velocity.x = 0;

    if (this.side == 'stay') {
        if (this.leftBUTTON.isDown) {
            if (this.top.x == 250) {

                //this.game.state.start('Game', true, false, this.game);
                //wyjebuj do piekla
            }
            if (this.top.x > 200) {
                this.side = 'left';
                this.lx = this.top.x - 200;
                
            }
        }
        if (this.rightBUTTON.isDown) {

            if (this.top.x == 550) {
                //this.game.state.start('Game', true, false, this.game);

                //wyjebuj do piekla
            }
            if (this.top.x < 600) {
                this.side = 'right';
                this.rx = this.top.x + 200;
                
            }
        }
    }
    
    if(this.top.x == 200) this.path = 'left';
    else if(this.top.x == 600) this.path = 'right';
    else this.path = 'center';

    if (this.upBUTTON.isDown && this.game.time.now > this.nextPos + this.restRate) {
        this.nextPos = this.game.time.now + this.posRate;
        this.top.animations.play('jump');
        this.actPos = 'jump';
    }
    if (this.downBUTTON.isDown && this.game.time.now > this.nextPos + this.restRate) {
        this.nextPos = this.game.time.now + this.posRate;
        this.top.animations.play('slide');
        this.actPos = 'slide';
    }
    /*if (this.leftBUTTON.isDown) {
        if (this.top.x > 150)
            this.top.body.velocity.x = -400;
        if (this.game.time.now > this.nextPos) {
            this.top.animations.play('left');
            this.actPos = 'run';
        }
    }
    if (this.rightBUTTON.isDown) {
        if (this.top.x < 650)
            this.top.body.velocity.x = 400;
        if (this.game.time.now > this.nextPos) {
            this.top.animations.play('right');
            this.actPos = 'run';
        }
    } else {
        if (this.game.time.now > this.nextPos) {
            this.top.animations.play('stand');
            this.actPos = 'run';
        }
    }*/
    if (this.side == 'left' && this.top.x != this.lx) {
        this.top.x -= 10;
        if (this.game.time.now > this.nextPos) {
            this.top.animations.play('left');
            this.actPos = 'run';
        }
    } else if (this.side == 'right' && this.top.x != this.rx) {
        this.top.x += 10;
        if (this.game.time.now > this.nextPos) {
            this.top.animations.play('right');
            this.actPos = 'run';
        }
    } else {
        this.side = 'stay';
        if (this.game.time.now > this.nextPos) {
            this.top.animations.play('stand');
            this.actPos = 'run';
        }
    }
}

Ftank.Goku.prototype.startGame = function (pointer) {

    // this.music.stop();

    //	And start the actual game
    this.state.start('Game2');

}