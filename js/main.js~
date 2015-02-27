window.onload = function() {
    
    "use strict";
    
    
    var game = new Phaser.Game( 840, 640, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update} );
    
    function preload() {
       game.load.tilemap('level1', 'assets/tilemaps.json', null, Phaser.Tilemap.TILED_JSON);
       game.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);       
       game.load.image('gameTiles', 'assets/hospitla-tileset.png');
       game.load.image('bloodbag', 'assets/bloodbag.png');
       game.load.image('cooler', 'assets/cooler.png');
       game.load.image('exit', 'assets/exit.png');
       game.load.image('background', 'assets/background.png');
       game.load.image('restartLevel', 'assets/restart.png');
       //images for the arrow keys
       game.load.image('left', 'assets/left.png');
       game.load.image('leftA', 'assets/leftActive.png');
       game.load.image('right', 'assets/right.png');
       game.load.image('rightA', 'assets/rightA.png');
       game.load.image('up', 'assets/up.png');
       game.load.image('upA', 'assets/upA.png');
       game.load.image('down', 'assets/down.png');
       game.load.image('downA', 'assets/downA.png');
       //
       game.load.image('r', 'assets/r.png');
       game.load.image('endScreen', 'assets/endScreen.png');

    }
    var bloodBags = 0;
    var bags;
    var cooler;
    var cursor;
    var blocktile
    var end;
    var bloodText, restartText, scoreText, levelText, gameText;
    var blood = 20.0, score = 0, finalScore = 0;
    var bloodTime;
    var map;
    var reset;
    var resetScreen, left, right, up, down, r;
    var currentLevel = 1;
    var levelString = '';
    var playerx = 0, playery = 0, bloodBagID = 0, endID = 0;
    var endBool = false;
    
   function create(){
   	   resetScreen = game.add.sprite(0,0, 'restartLevel');
   	   var background = game.add.sprite(641, 0, 'background');
   	   levels(currentLevel);
   	   
    	   bloodTime = game.time.create(false);
    	   bloodTime.add(20000, endLevel, this);
    	   
   	   cursor = game.input.keyboard.createCursorKeys();
   	   reset = game.input.keyboard.addKey(Phaser.Keyboard.R);
   	   var styleS = { font: "bold 12px Verdana", fill: "#000000", align: "left" };
   	   gameText = game.add.text(645, 150, 'Game Description\nGet to the elevator\nbefore your run out of blood.\nBlood Bags           will give\nyou more blood to survive.\n' +  
   	   	   '           are worth 10pts each\nor 30pts for not getting one.\n\n     - to restart a level\nArrow keys - to move', styleS);
   	   var gameBag = game.add.sprite(730, 210, 'bloodbag');
   	   var gameBag2 = game.add.sprite(655, 250, 'bloodbag');
   	   var gameEle = game.add.sprite(785, 170, 'exit');
   	   left = game.add.sprite(690, 375, 'left');
   	   right = game.add.sprite(730, 375, 'right');
   	   up = game.add.sprite(710, 355, 'up');
   	   down = game.add.sprite(710, 375, 'down');
   	   r = game.add.sprite(645, 310, 'r');
   	   
   	   
   }
    
    function update() {
    	    if(!endBool){
		game.physics.arcade.collide(cooler, blocktile);
		game.physics.arcade.overlap(cooler, bags, drinkBlood, null, this);
		game.physics.arcade.overlap(cooler, end, exitToNext, null, this);
		
		cooler.body.velocity.x = 0;
		cooler.body.velocity.y = 0;
		left.loadTexture('left');
		right.loadTexture('right');
		up.loadTexture('up');
		down.loadTexture('down');
		if(cursor.left.isDown){
			left.loadTexture('leftA');
			if(!bloodTime.running){
				bloodTime.start();
			}
			cooler.body.velocity.x = -64;	
		}
		else if(cursor.right.isDown){
			right.loadTexture('rightA');
			if(!bloodTime.running){
				bloodTime.start();
			}
			cooler.body.velocity.x = 64;
		}
		if(cursor.up.isDown){
			up.loadTexture('upA');
			if(!bloodTime.running){
				bloodTime.start();
			}
			cooler.body.velocity.y = -64;
		}
		else if(cursor.down.isDown){
			down.loadTexture('downA');
			if(!bloodTime.running){
				bloodTime.start();
			}
			cooler.body.velocity.y = 64;
		}
		
		if(bloodTime.seconds < 20){
			bloodText.setText('Blood: ' + String(((20 - Math.floor(bloodTime.seconds))/20)*100) + '%');
		}
		else{
			bloodText.setText('Blood: 0%');
			endLevel(false);
		}
		if(reset.isDown){
			endLevel(true);
		}
    	    }
    	    
    }
    function drinkBlood(player, item){
    	    item.kill();
    	    bloodTime.destroy();
    	    bloodTime = game.time.create(false);
    	    bloodTime.add(20000, endLevel, this);
    	    bloodBags--;
    	    score += 10;
    	    scoreText.setText("Score: " + String(score));
    }
    function exitToNext(player, exit){
    	    player.kill();
    	    finalScore += (bloodBags * 30);
    	    finalScore += score;
    	    scoreText.setText("Score: " + String(finalScore));
    	    currentLevel++;
    	    endLevel(true);
    }
    function endLevel(reset){
    	   //resetScreen.kill()
    	   map.destroy();
    	   bags.destroy();
    	   end.destroy();
    	   cooler.kill();
    	   bloodTime.destroy();
    	   //map.destroy();
    	   //restartText.setText("");
    	   bloodText.setText("");
    	   scoreText.setText("");
    	   levelText.setText("");
	   if(reset){
	   	cooler.destroy();
		bloodTime = game.time.create(false);
		bloodTime.add(20000, endLevel, this);
		levels(currentLevel);
    	   }
    	   else{
    	   	resetScreen = game.add.sprite(0,0, 'restartLevel');
    	   	var styleR = { font: "bold 25px Verdana", fill: "#FFFFFF", align: "center" };
    	   	restartText = game.add.text( 240, 320, "Press R to Restart the Level", styleR);
    	   }
    }
    function levels(level){
    	   resetScreen.destroy();
    	   if(level === 1){
    	    	    levelString = 'level1';
    	    	    playerx = 60;
    	    	    playery = 600;
    	    	    bloodBagID = 33;
    	    	    endID = 23;
    	    	    bloodBags = 6;
    	   }
    	   else if(level === 2){
    	   	   levelString = 'level2';
    	   	   playerx = 32;
    	   	   playery = 32;
    	   	   bloodBagID = 33;
    	   	   endID = 23;
    	   	   bloodBags = 8;
    	   }
    	   map = game.add.tilemap(levelString);
   	   map.addTilesetImage('hospitla-tileset', 'gameTiles');
   	   var backgroundLayer = map.createLayer('background');
   	   blocktile = map.createLayer('blocktile');
   	   map.setCollisionBetween(1, 100, true, 'blocktile');
   	   //create the player
   	   cooler = game.add.sprite(playerx, playery, 'cooler');
   	   game.physics.arcade.enable(cooler);
   	   //Text for each level
   	   var styleT = { font: "bold 25px Verdana", fill: "#C90000", align: "center" };
   	   bloodText = game.add.text(645, 110, 'Blood: 100%', styleT);
   	   var styleS = { font: "bold 25px Verdana", fill: "#000000", align: "center" };
   	   scoreText = game.add.text(645, 75, 'Score: ' + String(finalScore), styleS);
   	   levelText = game.add.text(645, 40, 'Level: ' + String(currentLevel), styleS);
   	   //create the sprites for the game objects
   	   bags = game.add.group();
   	   bags.enableBody = true;
   	   map.createFromObjects('blood bags', bloodBagID, 'bloodbag', 0, true, false, bags);
   	   end = game.add.group();
   	   end.enableBody = true;
   	   map.createFromObjects('end', endID, 'exit', 0, true, false, end);
   	   score = finalScore;
   	   //End of the game ---- win condition
   	   if(level === 3){
   	   	   endGame();
   	   }
    }
    function endGame() {
    	   endBool = true;
    	    var end = game.add.sprite(0,0, 'endScreen');
    	    var style = { font: "bold 25px Verdana", fill: "#FFFFFF", align: "center" };
    	    var text = game.add.text(310, 75, 'Final Score: ' + String(finalScore), style);
    }
    
};
