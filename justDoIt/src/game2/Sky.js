Ftank.Sky = function (game, x, y) {
    Phaser.Group.call(this, game);

    this.cursors;
    this.top;
    
    /*this.trap = [];
    this.nextTrap = 0; 
    this.rateTrap = 2000;*/
    
    this.build(x, y);

    return this;
};

Ftank.Sky.prototype = Object.create(Phaser.Group.prototype);
Ftank.Sky.prototype.constructor = Ftank.Sky;

Ftank.Sky.prototype.build = function (x, y) {
    this.enableBody = true;
    
    this.top = this.game.add.sprite(x, y, 'niebo');
    this.top.anchor.setTo(0.5, 0.5);
    
    //this.trap = this.game.add.group();
    //this.trap.enableBody = true;
    //this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    //this.trap.createMultiple(60, 'szatan');
    
    /*this.game.physics.enable(this.top, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.top);
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.leftBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upBUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);*/
}

Ftank.Sky.prototype.update = function () {
    /*if (this.game.time.now > this.nextTrap){
        this.nextTrap = this.game.time.now + this.rateTrap;
        this.trap.push(new Ftank.Trap(this.game, Math.floor((Math.random()*100)%3)+1));
    }*/
}