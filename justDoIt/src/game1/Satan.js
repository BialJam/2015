Ftank.Satan = function (game, x, y) {
    Phaser.Group.call(this, game);

    this.cursors;
    this.top;
    this.jumpTimer;
    this.bullets;

    this.side = 'right';
    this.lastmove = 0;

    this.cd = 0;
    this.cdnext = 1000;

    this.lastx;
    this.actx;
    this.czas = 0;
    this.czasnast = 0;

    this.nextFireAround = this.game.time.now + 6000;
    this.nextAroundRate = 6000;

    this.nextFireSimple = this.game.time.now + 2500;
    this.nextSimpleRate = 1500;

    this.bat;
    this.batRate = 5000;
    this.nextBatRate = this.game.time.now + 5000;

    this.build(x, y);

    return this;
};

Ftank.Satan.prototype = Object.create(Phaser.Group.prototype);
Ftank.Satan.prototype.constructor = Ftank.Satan;

Ftank.Satan.prototype.build = function (x, y) {
    this.enableBody = true;

    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(60, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);

    this.top = this.game.add.sprite(x, y, 'enemy');
    this.top.anchor.setTo(0.5, 0.5);

    this.game.physics.enable(this.top, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.top);

    this.top.animations.add('right', [4, 5, 6, 7], 10, true);
    this.top.animations.add('jumpRight', [10, 11], 10, true);

    this.top.animations.add('left', [0, 1, 2, 3, 2, 1], 10, true);
    this.top.animations.add('jumpLeft', [8, 9], 10, true);

    this.top.body.bounce.y = 0.2;
    this.top.body.collideWorldBounds = true;
    this.side = 'right';
    this.top.body.gravity.y = 400;

    this.lastx = this.top.y;
    this.actx = this.top.x;

    this.jumpTimer = 0;
}

Ftank.Satan.prototype.update = function () {
    //this.game.physics.arcade.collide(this.top, this.game.layer, function (obj1, obj2) {
    //   this.jump(obj1, obj2)
    // }, null, this);
    this.game.physics.arcade.collide(this.top, this.game.layer);
    //this.game.physics.arcade.overlap(this.bullets, this.game.layer, this.game.destroy, null, this.game);
    this.game.physics.arcade.overlap(this.game.player.bullets, this.game.layer, this.game.destroy, null, this.game);

    this.game.physics.arcade.overlap(this.game.player.bullets, this.game.layer, this.game.destroy, null, this.game);
    
    this.game.physics.arcade.collide(this.top, this.game.player.top,  function() {this.game.state.start('Over', true, false, this.game);}, null, this.game);
    
    this.game.physics.arcade.overlap(this.game.satan.bullets, this.game.player.top,  function() {this.game.state.start('Over', true, false, this.game);}, null, this.game);

    this.game.physics.arcade.overlap(this.game.satan.bullets, this.game.player.kameha, this.game.destroy, null, this.game);

    this.top.body.velocity.x = 0;

    if (this.game.time.now > this.cd) {
        this.cd = this.game.time.now + this.cdnext + Math.random() * 1800;
        if (this.game.player.top.x < this.top.x) {
            this.lastmove = -150;
            this.top.animations.play('left');
            this.side = 'left';
        }
        if (this.game.player.top.x > this.top.x) {
            this.lastmove = 150;
            this.top.animations.play('right');
            this.side = 'right';
        }
    }
    
    this.top.body.velocity.x = this.lastmove;

    this.actx = this.top.x;
    if (this.actx == this.lastx && this.top.body.onFloor())
        this.jump();
    this.lastx = this.top.x;

    if (!this.top.body.onFloor()) {
        if (this.side == 'right')
            this.top.animations.play('jumpRight');
        else this.top.animations.play('jumpLeft');
    } else {
        if (this.side == 'right')
            this.top.animations.play('right');
        else this.top.animations.play('left');
    }

    this.fireSimple();
    this.fireAround();
    this.newBat();
}

Ftank.Satan.prototype.jump = function (topp) {
    //if(this.game.player.top.y < this.top.y){
    this.top.body.velocity.y = -300;
    if (this.side == 'right')
    this.jumpTimer = this.game.time.now + 750;
    //}
}

Ftank.Satan.prototype.newBullet = function (x, y, xx, yy, angle) {
    var bullet = this.bullets.getFirstDead();
    bullet.allowGravity = false;
    bullet.reset(x, y);
    bullet.body.velocity.x = xx;
    bullet.body.velocity.y = yy;
    bullet.body.gravity.y = 0;
    bullet.angle = angle;
}

Ftank.Satan.prototype.fireAround = function () {
    if (this.game.time.now > this.nextFireAround) {
        this.nextFireAround = this.game.time.now + Math.random()*3000 + this.nextAroundRate;
        //this.nextFireAround = this.game.time.now + this.nextFireAround;
        this.newBullet(this.top.x, this.top.y, 400, 0, 0);
        this.newBullet(this.top.x, this.top.y, -400, 0, 180);
 
        this.newBullet(this.top.x, this.top.y, -400, 400, 135);
        this.newBullet(this.top.x, this.top.y, 400, -400, -45);
 
        this.newBullet(this.top.x, this.top.y, -400, -400, -135);
        this.newBullet(this.top.x, this.top.y, 400, 400, 45);
 
        this.newBullet(this.top.x, this.top.y, 0, -400, -90);
        this.newBullet(this.top.x, this.top.y, 0, 400, 90);
    }
}

Ftank.Satan.prototype.fireSimple = function () {
    if (this.game.time.now > this.nextFireSimple) {

        if (this.game.player.top.y > this.top.y - this.top.height / 2 && this.game.player.top.y < this.top.y + this.top.height / 2) {
            if (this.game.player.top.x > this.top.x)
                this.newBullet(this.top.x, this.top.y, 400, 0, 0);
            else
                this.newBullet(this.top.x, this.top.y, -400, 0, 180);
        }
        this.nextFireSimple = this.game.time.now + Math.random() * 900 + this.nextSimpleRate;
    }
}

Ftank.Satan.prototype.newBat = function () {
    if (this.game.time.now > this.nextBatRate) {
        this.nextBatRate = this.game.time.now + Math.random() * 3000 + this.batRate;
        this.bat = new Ftank.Bat(this.game, this.top.x, this.top.y);
    }
}

/*var Bullet = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);

};*/