Ftank.Player = function (game, x, y) {
    Phaser.Group.call(this, game);

    this.cursors;
    this.top;
    this.jumptimer;
    this.bullets;
    this.side;

    this.side2 = 'stay';

    this.hp = 100;
    this.mp = 100;
    
    this.nextFire = 0;
    this.fireRate = 300;

    this.kameha;
    this.kamehaActive = false;
    this.kamehaCount = 0;
    this.kamehaTime = false;

    this.healthBar;
    this.healthCrop;

    this.mapaBar;
    this.manaCrop;


    this.build(x, y);

    return this;
};

Ftank.Player.prototype = Object.create(Phaser.Group.prototype);
Ftank.Player.prototype.constructor = Ftank.Player;

Ftank.Player.prototype.build = function (x, y) {

    this.enableBody = true;

    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    //this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(60, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);

    this.top = this.game.add.sprite(x, y, 'player');

    this.game.physics.enable(this.top, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.top);

    this.top.animations.add('right', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    this.top.animations.add('stayRight', [32, 33, 34, 35, 36, 37], 10, true);
    this.top.animations.add('jumpRight', [45, 46, 47, 48, 49, 50, 51], 10, true);
    this.top.animations.add('kameRight', [21, 22, 23, 24, 25], 10, true);

    this.top.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.top.animations.add('stayLeft', [26, 27, 28, 29, 30, 31], 10, true);
    this.top.animations.add('jumpLeft', [38, 39, 40, 41, 42, 43, 44], 10, true);
    this.top.animations.add('kameLeft', [16, 17, 18, 19, 20], 10, true);

    this.top.anchor.setTo(0.5, 0.5);
    this.top.body.bounce.y = 0.2;
    this.top.body.collideWorldBounds = true;
    this.side = 'right';
    this.top.body.gravity.y = 400;

    this.jumpTimer = 0;

    this.kameha = this.game.add.group();
    this.kameha.enableBody = true;

    this.healthBar = this.game.add.sprite(150, 300, 'healthbar');
    this.healthBar.anchor.setTo(0, 0.5);
    this.healthCrop = new Phaser.Rectangle(0, 0, this.healthBar.width, this.healthBar.height);
    this.healthBar.crop(this.healthCrop);

    /*this.manaBar = this.game.add.sprite(150, 300, 'manabar');
    this.manaBar.anchor.setTo(0, 0.5);
    this.manaCrop = new Phaser.Rectangle(0, 0, this.manaBar.width, this.manaBar.height);
    this.manaBar.crop(this.healthCrop);*/
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.leftBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.wBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.eBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
}

Ftank.Player.prototype.update = function () {
    this.game.physics.arcade.collide(this.top, this.game.layer);

    this.kamehame();

    this.game.physics.arcade.overlap(this.bullets, this.game.layer, this.game.destroy, null, this.game);
    //this.game.physics.arcade.overlap(this.bullets, this.game.satan.top, this.game.destroy, null, this.game);
    //this.game.physics.arcade.overlap(this.bullets, this.game.satan.bat.top, this.game.destroy, null, this.game);
    this.game.physics.arcade.collide(this.bullets, this.game.satan.top, function (obj1, obj2) {
        this.hpRed(obj1, obj2, 10)
    }, null, this);
    
    if (this.hp <= 0) this.game.state.start('Game2', true, false, this.game);

    this.top.body.velocity.x = 0;
    
    this.healthCrop.width = this.hp/2;
    this.healthBar.updateCrop();
    this.healthBar.x = this.game.satan.top.x - 25;
    this.healthBar.y = this.game.satan.top.y + 52;

    
    if ((this.leftBUTTON.isDown) && (this.kamehaActive == false)) {
        this.top.body.velocity.x = -150;
        if (this.top.body.onFloor())
            this.top.animations.play('left');
        this.side = 'left';
        this.side2 = 'leftL';
    } else if ((this.rightBUTTON.isDown) && (this.kamehaActive == false)) {
        this.top.body.velocity.x = 150;
        if (this.top.body.onFloor())
            this.top.animations.play('right');
        this.side = 'right';
        this.side2 = 'rightR';
    } else if (this.side2 == 'leftL') this.side2 = 'stayL';
    else this.side2 = 'stayR';

    if (this.side2 == 'stayL' && this.top.body.onFloor() && this.kamehaActive == false) this.top.animations.play('stayLeft');
    else if (this.side2 == 'stayR' && this.top.body.onFloor() && this.kamehaActive == false) this.top.animations.play('stayRight');

    if (this.upBUTTON.isDown && this.top.body.onFloor() && this.game.time.now > this.jumpTimer && (this.kamehaActive == false)) {
        this.top.body.velocity.y = -300;
        if (this.side == 'left') {
            this.top.animations.play('jumpLeft');
        }
        if (this.side == 'right') this.top.animations.play('jumpRight');
        this.jumpTimer = this.game.time.now + 750;
    }
    if (this.wBUTTON.isDown && (this.kamehaActive == false)) {
        this.fire();
    }
}

Ftank.Player.prototype.hpRed = function (topp, obj2, damage) {
    this.game.Explosion(topp.x, topp.y);
    obj2.kill();
    this.hp -= damage;
}

Ftank.Player.prototype.hpRedkamehame = function (topp, obj2, damage) {
    this.hp -= damage;
}

Ftank.Player.prototype.kamehame = function () {
    if (this.kamehaActive == true) {
        this.game.physics.arcade.overlap(this.kameha, this.game.satan.top, function (obj1, obj2) {
            this.hpRedkamehame(obj1, obj2, 0.05*2)
        }, null, this);
        if (this.kamehaCount < 200) {
            if (this.side == 'right') {
                var a = this.kameha.create(this.top.x + 71 + this.kamehaCount * 15, this.top.y - 1, 'kame2', 0);
                a.anchor.setTo(0.5, 0.5);
                this.kamehaCount++;
            }
            if (this.side == 'left') {
                var a = this.kameha.create(this.top.x - 71 - this.kamehaCount * 15, this.top.y - 1, 'kame2', 0);
                a.anchor.setTo(0.5, 0.5);
                this.kamehaCount++;
            }
        }
        if (this.kamehaTime < this.game.time.now) {
            this.kameha.removeBetween(0, this.kamehaCount);
            this.kamehaActive = false;
        }
    } else if (this.eBUTTON.isDown && this.top.body.onFloor() && this.mp>40) {
        this.kamehaActive = true;
        this.kamehaCount = 0;
        this.kamehaTime = this.game.time.now + 2000;
        if (this.side == 'right') {
            this.top.animations.play('kameRight');
            var a = this.kameha.create(this.top.x + 52, this.top.y, 'kame1', 0);
            a.anchor.setTo(0.5, 0.5);
        }
        if (this.side == 'left') {
            this.top.animations.play('kameLeft');
            var a = this.kameha.create(this.top.x - 52, this.top.y, 'kame3', 0);
            a.anchor.setTo(0.5, 0.5);
        }
    }
}

Ftank.Player.prototype.newBullet = function (x, y) {
    var bullet = this.bullets.getFirstDead();
    bullet.allowGravity = false;
    bullet.reset(x, y);
    if (this.side == 'left') {
        bullet.body.velocity.x = -400;
        bullet.angle = 180;
        //this.bullets.animations.play('left');                    
    } else {
        bullet.body.velocity.x = 400;
        bullet.angle = 0;
        // this.bullets.animations.play('right'); 
    }

}

Ftank.Player.prototype.fire = function () {
    if (this.game.time.now > this.nextFire) {
        this.nextFire = this.game.time.now + this.fireRate;
        this.newBullet(this.top.x, this.top.y);
    }
}