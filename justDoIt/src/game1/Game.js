 Ftank.Game = function (game) {

     this.player;
     this.map;
     this.layer;
     this.bullets;
     this.satan;

     this.laser;
     
     this.music;

     this.explosionGroup;

     this.text = '';
     this.scoreText;

 };

 Ftank.Game.prototype = {

     create: function () {
         //mapa    
         this.add.image(0, 0, 'background');

         this.map = this.add.tilemap('map');

         this.map.addTilesetImage('hell');

         this.layer = this.map.createLayer('hell');
         this.layer.resizeWorld();

         this.player = new Ftank.Player(this, 800, 0);
         this.satan = new Ftank.Satan(this, 700, 500);

         this.map.setCollisionBetween(1, 2, true, 'hell');

                 
        this.music = this.game.add.audio('music');
        this.music.play();
         
         this.camera.follow(this.player.top);

         this.explosionGroup = this.game.add.group();
     },
     update: function () {
         //this.scoreText.text = 'HP: ' + this.player.hp;
         // this.scoreText.visible = true;
     },
     destroy: function (bullet) {
         this.Explosion(bullet.x, bullet.y);
         bullet.kill();
     },
     destroyall: function (bullet,bullet2) {
         this.Explosion(bullet.x, bullet.y);
         bullet.kill();
         bullet2.kill();
     },
     Explosion: function (x, y) {
         var explosion = this.explosionGroup.getFirstDead();
         if (explosion === null) {
             explosion = this.game.add.sprite(0, 0, 'explosion');
             explosion.anchor.setTo(0.5, 0.5);
             var animation = explosion.animations.add('boom', null, 60, false);
             animation.killOnComplete = true;
             this.explosionGroup.add(explosion);
         }
         explosion.revive();
         explosion.x = x;
         explosion.y = y;
         explosion.angle = this.game.rnd.integerInRange(0, 360);
         explosion.animations.play('boom');
         return explosion;
     }
 };