Ftank.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

Ftank.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);
        
        this.load.bitmapFont('rollingThunder', 'images/rolling-thunder.png', 'images/rolling-thunder.xml');
        
        this.load.tilemap('map', 'tiles/mapa.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('hell', 'tiles/hell.bmp');
        this.load.image('bullet', 'images/fire.png');
        this.load.spritesheet('enemy', 'images/diabel1.png', 65, 96);
        this.load.spritesheet('player', 'images/playa.png', 47, 48);
        this.load.spritesheet('laser', 'images/laser.png',1200, 50, 2);
        this.load.image('fast', 'images/lecimy.bmp');
        this.load.spritesheet('bat', 'images/bat.png', 70, 49);
        this.load.spritesheet('goku', 'images/sprajty.png',100,200);
        this.load.spritesheet('szatan', 'images/szatan.png');
        this.load.spritesheet('niebo', 'images/way.png');
        this.load.spritesheet('explosion', 'images/explosion.png', 64, 64, 23);
        this.load.image('background', 'images/background.png');
        
        this.load.spritesheet('skala', 'images/rockmaly.png');
        this.load.spritesheet('wall', 'images/wall.png');
        this.load.spritesheet('posagr', 'images/posag.png');
        this.load.spritesheet('posagl', 'images/posag2.png');
        this.load.spritesheet('dziura', 'images/hole.png');
        
        this.load.spritesheet('kame1', 'images/kame1a.png');
        this.load.spritesheet('kame2', 'images/kame2.png');
        this.load.spritesheet('kame3', 'images/kame3a.png');
        
         this.load.image('elo', 'images/menu.png');
        
                this.load.audio('music2', 'sounds/game2.mp3');
        this.load.audio('music', 'sounds/game.mp3');
        
        this.load.image('healthbar', 'images/hp.png');
        this.load.image('manabar', 'images/mp.png');
        //this.load.spritesheet('enemy1', 'assets/enemy1.png', 50, 50, 5);
    },

	create: function () {

		this.preloadBar.cropEnabled = false;

		this.state.start('MainMenu');

	},

	update: function () {

		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
			// this.ready = true;
			// this.state.start('MainMenu');
		// }

	}

};