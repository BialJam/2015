var game = new Phaser.Game(800, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
function preload() {
    game.load.tilemap('mapa', 'map/mapaOstateczna6.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('ball', 'sprites/bloczki.png', 20, 20, -1, 0, 0);
    game.load.image('bloczkii', 'map/bloczki.png');
    game.load.image('przegrana','sprites/przegrana.png');
}
var endgameee=1;    
var wygrana=0;
var pilka;
var pilka2;
var uderzone = 0;
var map; // mapka
var cursors;
var start;
var end;
var roznica;
var czyWcisniety;
var czyPuszczony = true;
var czyGrawitacja = true;
var czyPuszczony1 = true;
var czyWcisniety1; 
var koniecGry;
var layer1; //tlo
var layer2; //szary
var layer3; //czerwony
var layer4; //czarny
var layer5; //rozowy
var layer6; //grawitacjaOff
var layer7; //grawitacjaOn
var layer8; //koniec
var keyboard;
var score = 0;
var licznik = 0;
var pozycjaNowa;
var pozycjaPodczasZmiany = 0;
var jestpika2=false;
var grupaPilek;
var pilki = [];

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //tile map
    map = game.add.tilemap('mapa');
    map.addTilesetImage('bloczki', 'bloczkii');
    layer1 = map.createLayer('sky');
    layer2 = map.createLayer('szary');
    layer3 = map.createLayer('czerwony');
    layer4 = map.createLayer('czarny');
    layer5 = map.createLayer('rozowy');
    layer6 = map.createLayer('grawitacjaOff');
    layer7 = map.createLayer('grawitacjaOn');
    layer8 = map.createLayer('koniec');
    layer1.resizeWorld();
    map.setCollision(5, true,layer2); //szary
    map.setCollision(2, true,layer3); //czerwony
    map.setCollision(1, true,layer4); //czarny
    map.setCollision(6, true,layer5); //rozowy
    map.setCollision(7, true,layer6); //zolty
    map.setCollision(8, true,layer7); //pomaranczowy
    map.setCollision(4, true,layer8); //zielony
    
    //pilka
    grupaPilek = game.add.group();
    pilki[0] = grupaPilek.create(100, game.world.height / 2, 'ball', 0);
    game.physics.arcade.enable(pilki[0]);
    pilki[0].body.gravity.y = 300; //ciezar postaci
    pilki[0].body.collideWorldBounds = true; // aby nie wyszedl poza obszar
    
    /*
    pilka = game.add.sprite(100, game.world.height / 2, 'ball', 0);
    game.physics.arcade.enable(pilka);
    pilka.body.gravity.y = 300; //ciezar postaci
    pilka.body.collideWorldBounds = true; // aby nie wyszedl poza obszar
    */
    //dodajemy mozliwosc skoku
    cursors = game.input.keyboard.createCursorKeys();
    keyboard = game.input.keyboard;
    
    game.camera.follow(pilki[0]);
    
    // The score
    scoreText = game.add.text(16, 10, 'Score: 0', { fontSize: '32px', fill: '#000' });
    scoreText.fixedToCamera = true;
    zycie = game.add.text(160, 10, 'Life: 2', { fontSize: '32px', fill: '#000' });
    zycie.fixedToCamera = true;
}

function update() {
    //2 - szary, 3 - czerwony, 4 - czarny, 5 - rozowy, 6 - OFF, 7 - on, 8 - koniec
    //kolizje
    //pilka.body.x += 10;
    if(uderzone == 0) {
        pilki[0].body.x += 5;
        game.physics.arcade.collide(pilki[0],layer2); //szary
        game.physics.arcade.collide(pilki[0],layer5, endOfGame); //rozowy
        game.physics.arcade.overlap(pilki[0],layer6, grawOFF); //graw off
        game.physics.arcade.overlap(pilki[0],layer7, grawON); //graw on
        game.physics.arcade.collide(pilki[0],layer8, victory); //koniec gry
    }
    else {
        pilki[0].body.x += 5;
        if(jestpika2) pilki[1].body.x += 5;
        game.physics.arcade.collide(pilki[0],layer2); //szary
        game.physics.arcade.collide(pilki[0],layer5, endOfGame); //rozowy
        game.physics.arcade.overlap(pilki[0],layer6, grawOFF); //graw off
        game.physics.arcade.collide(pilki[0],layer7, grawON); //graw on
        game.physics.arcade.collide(pilki[0],layer8, victory); //koniec gry

        if(jestpika2){
            game.physics.arcade.collide(pilki[1],layer2); //szary
            game.physics.arcade.collide(pilki[1],layer5, endOfGame); //rozowy
            game.physics.arcade.overlap(pilki[1],layer6, grawOFF); //graw off
            game.physics.arcade.overlap(pilki[1],layer7, grawON); //graw on
            game.physics.arcade.collide(pilki[1],layer8, victory); //koniec gry

        }
    }

    //kolizje
    if(pilki[0].frame == 0) {
        // jak jestesmy czarnym
        game.physics.arcade.collide(pilki[0],layer3, endOfGame);
        game.physics.arcade.collide(pilki[1],layer3, endOfGame);
    }
    else if(pilki[0]. frame == 1) {
        //jak jestesmy czerwonym
        game.physics.arcade.collide(pilki[0],layer4, endOfGame);
        game.physics.arcade.collide(pilki[1],layer4, endOfGame);
    }
    if (keyboard.isDown(Phaser.Keyboard.SPACEBAR) && czyPuszczony == true) {
        if (pilki[0].body.onFloor()) {
            start = pilki[0].body.x;
            czyWcisniety = true;
            //console.log("start = " + start);
            czyPuszczony = false;
        }
    }
    if (!keyboard.isDown(Phaser.Keyboard.SPACEBAR) && czyWcisniety == true) {
        end = pilki[0].body.x;       
        roznica = end - start;
        pilki[0].body.velocity.y = roznica * (-7);
        if(jestpika2) {
            pilki[1].body.velocity.y = roznica * (7);
        }
        start = 0;
        end = 0;
        roznica = 0;
        czyWcisniety = false;
        czyPuszczony = true;
    }
    
    pozycjaNowa = pilki[0].body.x; 
    if(game.input.keyboard.isDown(Phaser.Keyboard.A) && pozycjaNowa-pozycjaPodczasZmiany>=100) {
        pozycjaPodczasZmiany = pilki[0].body.x;
        zmiana();
    }
    
    //wynik - uaktualnienie
    ++licznik;  
    if(licznik%100 == 0 && endgameee == 1 && wygrana == 0) {
        score += 1;
        scoreText.text = 'Score: ' + score;}
        if(licznik%50 == 0 && endgameee == 2 && wygrana ==0 ) {
        score += 1;
        scoreText.text = 'Score: ' + score ;
        }
        
    if(game.input.keyboard.isDown(Phaser.Keyboard.W) && czyGrawitacja == false) {
        pilki[0].body.velocity.y = -100;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.S) && czyGrawitacja == false) {
        pilki[0].body.velocity.y = +100;
        }
}

function render() {
    //game.debug.body(pilka);
    //game.debug.bodyInfo(pilki[0]);
    //game.debug.body(layer3);
}

function endOfGame(player, layerr) {
    zycie.text='Life: ' + (2-endgameee);
    endgameee++;
    if(uderzone == 0) {
        uderzone++;
        var osX = player.body.x;
        var osY = player.body.y;
        pilki[0].body.x = osX+50;
        if(czyGrawitacja){
            jestpika2=true;
            /*pilka2 = game.add.sprite(osX+50,game.world.height - osY, 'ball', pilka.frame);
            game.physics.arcade.enable(pilka2);
            pilka2.body.gravity.y = -300; //ciezar postaci
            pilka2.body.collideWorldBounds = true; // aby nie wyszedl poza obszar*/
            pilki[1] = grupaPilek.create(osX+50,game.world.height - osY, 'ball', pilki[0].frame);
            game.physics.arcade.enable(pilki[1]);
            pilki[1].body.gravity.y = -300;
            pilki[1].body.collideWorldBounds = true;
        }
    }
    else {
        uderzone++;
        pilki[0].kill();
        console.log("przegrana");
        scoreText.text = 'You lose';
        pilki[0].body.checkCollision.down = false;
        pilki[0].body.collideWorldBounds = false;
        if(jestpika2){
            pilki[1].body.checkCollision.down = false;
            pilki[1].body.collideWorldBounds = false;
            pilki[1].kill();
        }
        pilki[0].kill();
        scoreText.destroy();
        }
    }

function victory(player, layerrr) {
    console.log("victory");
    wygrana=1;
}

function grawOFF(player, layeR) {
    console.log("wylaczam grawitacje");
    var X = player.body.x;
    player.body.x = X+40;
    pilki[0].body.gravity.y = 0; //ciezar postaci
    czyGrawitacja = false;
    if(jestpika2) {
        pilki[1].kill();
    }
}

function grawON(player, tile) {
    console.log("wlaczam grawitacje");
    var osX = player.body.x;
    var osY = player.body.y;
    player.body.x = osX+40;
    player.body.gravity.y = 300; //ciezar postaci
    czyGrawitacja = true;
    if(uderzone!=0){
        /*pilka2 = game.add.sprite(osX+40,game.world.height - osY, 'ball', pilka.frame);
        game.physics.arcade.enable(pilka2);
        pilka2.body.gravity.y = -300; //ciezar postaci
        pilka2.body.collideWorldBounds = true; // aby nie wyszedl poza obszar*/
        pilki[1] = grupaPilek.create(osX+50,game.world.height - osY, 'ball', pilki[0].frame);
        game.physics.arcade.enable(pilki[1]);
        pilki[1].body.gravity.y = -300;
        pilki[1].body.collideWorldBounds = true;  
    }
}

function zmiana() {
    //zmiana koloru
    // 0 - czarny, 1 - czerwony
    // layer3 - czerwone, layer4 - czarne
    if(pilki[0].frame == 0) {
        pilki[0].frame = 1;
        czyCzarny = false;
        if(jestpika2) {
            pilki[1].frame = 1;
        }
    }
    else {
        pilki[0].frame = 0;
        if(jestpika2) {
            pilki[1].frame = 0
        }
    }
}