Ftank.Game2 = function (game) {
    
    this.sky;
    this.goku;
    this.traps;
    
        this.text = '';
    this.pathText;
    this.scoreText;
    
    this.music;
    
};

Ftank.Game2.prototype = {

    create: function () {
        //mapa    
        var t2 = this.add.bitmapText(0, 64, 'rollingThunder', 'hhbhbhh', 32);
	    t2.x = 325 - (t2.textWidth / 2);
        t2.y = 300 - (t2.textHeight / 2);
        //this.game.add.sprite(0, 0, 'niebo');
        
        this.music = this.game.add.audio('music2');
        this.music.play();
        
        this.sky = new Ftank.Sky(this,400, 300);
        this.goku = new Ftank.Goku(this, 400, 525);
        this.traps = new Ftank.Trap(this);
        
       
        this.scoreText = this.game.add.text(100, 350, this.text + this.traps.scores, { font: '34px Arial', fill: '#fff' });
        //this.game.add.sprite(0, 0, 'szatan');
    },
    update: function () {
        
        this.scoreText.text = '' + this.traps.scores;
    }
};