 Ftank.Over = function (game) {
    this.text = '';    
};

Ftank.Over.prototype = {
    create: function () {
        var t = this.add.bitmapText(0, 64, 'rollingThunder', 'GAME', 48);
	    t.x = 325 - (t.textWidth / 2);
        var t2 = this.add.bitmapText(0, 64, 'rollingThunder', 'OVER', 32);
	    t2.x = 325 - (t2.textWidth / 2);
        t2.y = 300 - (t2.textHeight / 2);  
    },
    update: function () {
        
    }
};