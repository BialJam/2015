Ftank.Trap = function (game) {
    Phaser.Group.call(this, game);

    this.endmap;

    this.traps;
    this.nextTrap = 0;
    this.trapRate = 2000;
    this.whichTrap;
    this.scores;

    this.build();

    return this;
};

Ftank.Trap.prototype = Object.create(Phaser.Group.prototype);
Ftank.Trap.prototype.constructor = Ftank.Trap;

Ftank.Trap.prototype.build = function () {
    this.traps = this.game.add.group();
    this.traps.enableBody = true;

    this.endmap = this.create(0, 650);
    this.endmap.enableBody = true;

    this.game.physics.enable(this.endmap, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable(this.endmap);

    this.endmap.height = 1;
    this.endmap.width = 800;
    
    this.scores = 0;
}

Ftank.Trap.prototype.update = function () {
    this.game.physics.arcade.overlap(this.traps, this.endmap, function (obj1, obj2) {
        this.usun(obj1, obj2)
    }, null, this);

    if (this.game.time.now > this.nextTrap) {
        
        this.whichTrap = Math.floor((Math.random() * 100) % 4);
        if (this.whichTrap == 0){
            this.newRock(Math.floor((Math.random() * 100) % 3) + 1);
            
        }
        else if (this.whichTrap == 1)
            this.newWall();
        else if (this.whichTrap == 2)
            this.newStatue(Math.floor((Math.random() * 100) % 2));
        else if (this.whichTrap == 3)
            this.newHole(Math.floor((Math.random() * 100) % 3) + 1);
        this.nextTrap = this.game.time.now + this.trapRate;
    }
}

Ftank.Trap.prototype.usun = function (obj1, obj2) {

    var gotohell = false;

    if (obj2.key == 'skala'){
     
         if ((obj2.x < 300) && (this.game.goku.path == 'left'))
            gotohell = true;
        if ((obj2.x > 300 && obj2.x < 500) && (this.game.goku.path == 'center'))
            gotohell = true;
        if ((obj2.x > 500) && (this.game.goku.path == 'right'))
            gotohell = true;
    }
        //gotohell = true;
    else if (obj2.key == 'wall' && this.game.goku.actPos != 'jump')
        gotohell = true;
    else if (obj2.key == 'posagr' && (this.game.goku.actPos != 'slide' && this.game.goku.path != 'right'))
        gotohell = true;
    else if (obj2.key == 'posagl' && (this.game.goku.actPos != 'slide' && this.game.goku.path != 'left'))
        gotohell = true;
    else if (obj2.key == 'dziura') {
        if ((obj2.x < 300) && (this.game.goku.path == 'left') && (this.game.goku.actPos != 'jump'))
            gotohell = true;
        if ((obj2.x > 300 && obj2.x < 500) && (this.game.goku.path == 'center') && (this.game.goku.actPos != 'jump'))
            gotohell = true;
        if ((obj2.x > 500) && (this.game.goku.path == 'right') && (this.game.goku.actPos != 'jump'))
            gotohell = true;
    }
    //if((obj2.x < this.game.goku.top.x + this.game.goku.top.width/2 ) && (obj2.x > this.game.goku.top.x - this.game.goku.top.width/2 ))
    if(gotohell == true){
       this.game.music.stop();
        
        
        this.game.state.start('Game', true, false, this.game);
        
    }
        
        this.scores += 50;
        obj2.kill();
}

Ftank.Trap.prototype.newRock = function (tor) {
    var x = 400,
        bodyx = 0;
    if (tor == 1) {
        x = 390;
        bodyx = -55;
    }
    if (tor == 3) {
        x = 410;
        bodyx = 55;
    }

    var a = this.traps.create(x, 120, 'skala', 0);
    a.body.velocity.y = 100;
    a.body.velocity.x = bodyx;
    a.scale.x = 0.01;
    a.scale.y = 0.01;
    this.game.add.tween(a.scale).to({
        x: 1.3,
        y: 1.3
    }, 4100, Phaser.Easing.Linear.Out, true);
    a.anchor.setTo(0.5, 0.5);
}

Ftank.Trap.prototype.newWall = function () {
    var a = this.traps.create(400, 150, 'wall', 0);
    a.body.velocity.y = 100;
    a.scale.x = 0.1;
    a.scale.y = 0.1;
    this.game.add.tween(a.scale).to({
        x: 1,
        y: 0.65
    }, 4100, Phaser.Easing.Linear.Out, true);
    a.anchor.setTo(0.5, 0.5);
}

Ftank.Trap.prototype.newStatue = function (strona) {
    var a;
    if (strona == 0)
        a = this.traps.create(400, 150, 'posagr', 0);
    if (strona == 1)
        a = this.traps.create(400, 150, 'posagl', 0);
    a.body.velocity.y = 100;
    a.scale.x = 0.1;
    a.scale.y = 0.1;
    this.game.add.tween(a.scale).to({
        x: 1,
        y: 0.65
    }, 4100, Phaser.Easing.Linear.Out, true);
    a.anchor.setTo(0.5, 0.5);
}

Ftank.Trap.prototype.newHole = function (tor) {
    var x = 400,
        bodyx = 0;
    if (tor == 1) {
        x = 390;
        bodyx = -55;
    }
    if (tor == 3) {
        x = 410;
        bodyx = 55;
    }

    var a = this.traps.create(x, 120, 'dziura', 0);
    a.body.velocity.y = 100;
    a.body.velocity.x = bodyx;
    a.scale.x = 0.01;
    a.scale.y = 0.01;
    this.game.add.tween(a.scale).to({
        x: 1.3,
        y: 1.3
    }, 4100, Phaser.Easing.Linear.Out, true);
    a.anchor.setTo(0.5, 0.5);
}