Ftank.Bat = function (game, x, y) {
    Phaser.Group.call(this, game);
    this.top;

    this.tempangle;

    this.build(x, y);

    return this;
};

Ftank.Bat.prototype = Object.create(Phaser.Group.prototype);
Ftank.Bat.prototype.constructor = Ftank.Bat;

Ftank.Bat.prototype.build = function (x, y) {
    this.top = this.game.add.sprite(x, y, 'bat');
    this.top.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.top, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.top);
    this.top.animations.add('left', [2, 3], 6, true);
    this.top.animations.add('right', [0, 1], 6, true);
}

Ftank.Bat.prototype.update = function () {
    this.game.physics.arcade.overlap(this.top, this.game.player.kameha, this.game.destroy, null, this.game);
    this.game.physics.arcade.overlap(this.top, this.game.player.bullets, this.game.destroyall, null, this.game);
    this.game.physics.arcade.overlap(this.top, this.game.player.top, function() {this.game.state.start('Over', true, false, this.game);}, null, this.game);

    //function() {this.game.state.start('Over', true, false, this.game);}
    //function() {this.game.state.start('Game2', true, false, this.game);}

    this.tempangle = this.game.physics.arcade.moveToXY(this.top, this.game.player.top.x, this.game.player.top.y, 150);
    if (this.game.player.top.x > this.top.x)
        this.top.animations.play('right');
    else this.top.animations.play('left');
}