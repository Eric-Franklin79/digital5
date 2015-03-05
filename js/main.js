window.onload = function() {
    
    "use strict";
    
    
    var game = new Phaser.Game( 640, 640, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update} );
    
    function preload() {
       game.load.tilemap('street', 'assets/street.json', null, Phaser.Tilemap.TILED_JSON);
       game.load.image('streetTiles', 'assets/tileSet.png');
       game.load.tilemap('dealer', 'assets/dealership.json', null, Phaser.Tilemap.TILED_JSON);
       game.load.image('dealerTiles', 'assets/dealershipTileset.png');
       game.load.tilemap('secret', 'assets/secret.json', null, Phaser.Tilemap.TILED_JSON);
       game.load.image('secretTiles', 'assets/secrateTileset.png');
       game.load.image('door', 'assets/door.png');
       game.load.image('door2', 'assets/door2.png');
       game.load.image('doorS', 'assets/doorS.png');
       game.load.image('dude', 'assets/player1.png');
       game.load.image('dudeS', 'assets/player1s.png');
       game.load.atlasJSONHash('player2', 'assets/player2p.png', 'assets/player2p.json');
       game.load.image('exit', 'assets/exit.png');
       game.load.image('lazerR', 'assets/lazerR.png');
       game.load.image('lazerU', 'assets/lazerU.png');     
       game.load.image('blue', 'assets/blue.png');
       game.load.image('red', 'assets/red.png');
       game.load.image('jail', 'assets/jail.png');
       game.load.image('win', 'assets/win.png');
       game.load.image('mallet', 'assets/mallet.png');
       game.load.image('ped', 'assets/ped.png');
       //load the cars
       game.load.atlasJSONHash('carB', 'assets/carBs.png', 'assets/carBs.json');
       game.load.atlasJSONHash('carB2', 'assets/carB2s.png', 'assets/carB2s.json');
       game.load.atlasJSONHash('carG', 'assets/carGs.png', 'assets/carGs.json');
       game.load.atlasJSONHash('carG2', 'assets/carG2s.png', 'assets/carG2s.json');
       game.load.atlasJSONHash('carR', 'assets/carRs.png', 'assets/carRs.json');
       game.load.atlasJSONHash('carR2', 'assets/carR2s.png', 'assets/carR2s.json');
    }
    var map;
    var blockTile, blockTile2;
    var door, door2, doorS, exit, doorO, mallet;
    var player, player2;
    var cursors;
    var carB, carB2, carG, carG2, carR, carR2;
    var carBB, carBB2, carGG, carGG2, carRR, carRR2
    var cars;
    var flashing = false, ifDealer = false, special = false;
    var swing;
    var scoreText, timeText;
    var score = 0;
    var swingNum = 0;
    var lazerRs, lazerUs;
    var timer, red, blue;
   function create(){
   	  loadStreet();
   	  player2 = game.add.sprite(500, 500, 'player2');
   	   game.physics.arcade.enable(player2);
   	   player2.kill();
   	   
   	  cursors = game.input.keyboard.createCursorKeys();
   	  swing = game.input.keyboard.addKey(Phaser.Keyboard.Q);
   	  game.camera.follow(player);
   	  timer = game.time.create(false);
   	  timer.add(20000, jail, this);
   }
    
   function update(){
    	   game.physics.arcade.collide(player, blockTile);
    	   game.physics.arcade.overlap(player, doorO, enterO, null, this);
    	   game.physics.arcade.overlap(player, mallet, pickUp, null, this);
    	    if(ifDealer === false){
    	   game.physics.arcade.overlap(player, door, enterD, null, this);
    	   game.physics.arcade.overlap(player, door2, enterD, null, this);
    	    }
    	    else{
    	    	 
    	    	 game.physics.arcade.collide(door, blockTile);
    	    	 game.physics.arcade.collide(door2, blockTile);
    	    	 game.physics.arcade.collide(player, door);
    	    	 game.physics.arcade.collide(player, door2);
    	    }
    	   game.physics.arcade.overlap(player, doorS, enterS, null, this);
    	   if(ifDealer){
    	   	   game.physics.arcade.collide(player2, blockTile2);
		   game.physics.arcade.collide(cars, blockTile2);
		   if(!flashing){
		   game.physics.arcade.overlap(player2, lazerRs, popo, null, this);
		   game.physics.arcade.overlap(player2, lazerUs, popo, null, this);
		   }
		   //collision with each car
		   game.physics.arcade.collide(player2, carB, damCar, null, this);
		   game.physics.arcade.collide(player2, carR, damCar, null, this);
		   game.physics.arcade.collide(player2, carG, damCar, null, this);
		   game.physics.arcade.collide(player2, carRR, damCar, null, this);
		   game.physics.arcade.collide(player2, carGG, damCar, null, this);
		   game.physics.arcade.collide(player2, carB2, damCar, null, this);
		   game.physics.arcade.collide(player2, carG2, damCar, null, this);
		   game.physics.arcade.collide(player2, carR2, damCar, null, this);
		   game.physics.arcade.collide(player2, carBB2, damCar, null, this);
		   game.physics.arcade.collide(player2, carRR2, damCar, null, this);
		   //door
		   game.physics.arcade.overlap(player2, exit, exitD, null, this);
    	   }
    	   //controls if street player is alive
   	   if(player.alive){
   	   	   if(ifDealer){
			   if(player.y > 950){
				 win();  
			   }
   	   	   }
		   player.body.velocity.x = 0;
		   player.body.velocity.y = 0;
		   if(cursors.left.isDown){
			   player.body.velocity.x = -80;
		   }
		   else if(cursors.right.isDown){
			   player.body.velocity.x = 80;
		   }
		   if(cursors.up.isDown){
			   player.body.velocity.y = -80;
		   }
		   else if(cursors.down.isDown){
			   player.body.velocity.y = 80;
		   }
   	   }
   	   //controls if dealership player is alive
   	   if(player2.alive){
		   player2.body.velocity.x = 0;
		   player2.body.velocity.y = 0;
		   if(cursors.left.isDown){
			   player2.body.velocity.x = -180;
		   }
		   else if(cursors.right.isDown){
			   player2.body.velocity.x = 180;
		   }
		   if(cursors.up.isDown){
			   player2.body.velocity.y = -180;
		   }
		   else if(cursors.down.isDown){
			   player2.body.velocity.y = 180;
		   }
		   if(swing.downDuration(1)){
		   	   player2.animations.play('swing');
   	   	   }
   	   }
   	   if(timer.running){
   	   	timeText.setText(String(20-Math.floor(timer.seconds)));   
   	   }
   }
   //enter the dealership level
   function enterD(play, doo){
   	   game.camera.reset();
   	   player.kill();
   	   map.destroy();
   	   loadDealer();
   	   game.camera.follow(player2);
   	   
   	   
   }
   //enter the secrate area
   function enterS(play, doo){
   	   game.camera.reset();
   	   player.kill();
   	   map.destroy();
   	   loadS();
   	   game.camera.follow(player);
   }
   function enterO(play, doo){
   	   game.camera.reset();
   	   player.kill();
   	   map.destroy();
   	   loadStreet();
   	   player.reset(592, 747);
   	   game.camera.follow(player);
   }
   function pickUp(play, item){
   	   special = true;
   	   play.loadTexture('dudeS');
   	   item.loadTexture('ped');
   }
   //leave the dealership level into the street level
   function exitD(play, doo){
   	   game.camera.reset();
   	   player2.destroy();
   	   map.destroy();
   	   loadStreet(); 
   	   player.reset(154, 332);
   	   game.camera.follow(player);
   }
   //damages the cars and give score
   function damCar(play, car){
   	   if(swing.downDuration(1)){
   	   	   player2.animations.play('swing');
   	   	 
   	   	 if(car.frame < 5){
   	   	 	 if(!special){
				 swingNum++;
				 score += 100;
				 scoreText.setText("Damage: $" + String(score));
				 if(swingNum === 5){
					 car.frame += 1;
					 swingNum = 0;
					 score += 10000;
					 scoreText.setText("Damage: $" + String(score));
				 }
			 }
			 if(special){
			 	  car.frame += 1;
			 	  score += 10500;
			 	  scoreText.setText("Damage: $" + String(score));
			 }
   	   	 }
   	   	 if(car.frame > 4){
   	   	 	car.animations.play('burn');
   	   	 }
   	   }
   }
  
   // creates the end game situation
   function popo(play, laze){
   	   laze.kill();
   	   timer.start();
   	   flashing = true;
   	   flash();
   	   //add red and blue sprites
   }
   //sets and creates the end game warning text & sprites
   function flash(){
   	   var styleT = { font: "bold 30px Verdana", fill: "#FFFFFF", align: "left" };
   	   timeText = game.add.text(game.world.centerX, 5, String(20-Math.floor(timer.seconds)), styleT);
   	   timeText.fixedToCamera = true;
   	   red = game.add.sprite(0,0,'red');
   	   blue = game.add.sprite(340,0,'blue');
   	   red.alpha = 0.2;
   	   blue.alpha = 0.2
   }
   //creates the street level for the game
   function loadStreet(){
   	   map = game.add.tilemap('street');
   	   map.addTilesetImage('tileSet', 'streetTiles');
   	   var backgroundLayer = map.createLayer('background');
   	   blockTile = map.createLayer('blocked');
   	   map.setCollisionBetween(1, 100, true, 'blocked');
   	   backgroundLayer.resizeWorld();
   	   if(!special){
   	   	   player = game.add.sprite(300, 976, 'dude');
   	   	   game.physics.arcade.enable(player);
   	   }
   	   else if(special){
   	   	   player = game.add.sprite(592, 747, 'dudeS');
   	   	   game.physics.arcade.enable(player);
   	   }
   	   door = game.add.group();
   	   door.enableBody = true;
   	   map.createFromObjects('door', 58, 'door', 0, true, false, door);
   	   door2 = game.add.group();
   	   door2.enableBody = true;
   	   map.createFromObjects('door2', 59, 'door2', 0, true, false, door2);
   	   doorS = game.add.group();
   	   doorS.enableBody = true;
   	   map.createFromObjects('specialDoor', 41, 'doorS', 0, true, false, doorS);
   	   var styleS = { font: "bold 20px Verdana", fill: "#FFFFFF", align: "left" };
   	   scoreText = game.add.text(20, 10, 'Damage: $' + String(score), styleS);
   	   scoreText.fixedToCamera = true;
   	   if(flashing){
   	   	   flash();
   	   }
   	   if(ifDealer){
   	   var style = { font: "bold 15px Verdana", fill: "#FFFFFF", align: "left" };
   	   var out = game.add.text(300, 940, "Exit\n  |\n  V", style);
   	   	   
   	   }
   }
   //creates the inside dealership level for the game
   function loadDealer(){
   	   map = game.add.tilemap('dealer');
   	   map.addTilesetImage('dealershipTileset', 'dealerTiles');
   	   var backgroundLayer = map.createLayer('background');
   	   blockTile2 = map.createLayer('blocked');
   	   map.setCollisionBetween(1, 100, true, 'blocked');
   	   backgroundLayer.resizeWorld();
   	   if(special){
   	   	   player2 = game.add.sprite(480, 868, 'player2', 'player22.png');
   	   	   game.physics.arcade.enable(player2);
   	   	   player2.animations.add('swing', ['player22.png', 'player2s2.png', 'player22.png'], 10);
   	   }
   	   else{
   	   	   player2 = game.add.sprite(480, 868, 'player2', 'player2.png');
   	   	   game.physics.arcade.enable(player2);
   	   	   player2.animations.add('swing', ['player2.png', 'player2s.png', 'player2.png'], 10);
   	   }
   	   game.camera.follow(player2);
   	   exit = game.add.group();
   	   exit.enableBody = true;
   	   map.createFromObjects('exit', 29, 'exit', 0, true, false, exit);
   	   lazerRs = game.add.group();
   	   lazerRs.enableBody = true;
   	   map.createFromObjects('lazerR', 37, 'lazerR', 0, true, false, lazerRs);
   	   lazerUs = game.add.group();
   	   lazerUs.enableBody = true;
   	   map.createFromObjects('lazerU', 38, 'lazerU', 0, true, false, lazerUs);
   	   if(ifDealer === false){
   	   createCars();
   	   }
   	   ifDealer = true;
   	   var styleS = { font: "bold 20px Verdana", fill: "#000000", align: "left" };
   	   scoreText = game.add.text(20, 10, 'Damage: $' + String(score), styleS);
   	   scoreText.fixedToCamera = true;
   }
   function loadS(){
   	   map = game.add.tilemap('secret');
   	   map.addTilesetImage('secrateTileset', 'secretTiles');
   	   var backgroundLayer = map.createLayer('background');
   	   blockTile = map.createLayer('blocked');
   	   map.setCollisionBetween(1, 100, true, 'blocked');
   	   backgroundLayer.resizeWorld();
   	   if(!special){
   	   	   player = game.add.sprite(324, 225, 'dude');
   	   	   game.physics.arcade.enable(player);
   	   }
   	   else if(special){
   	   	   player = game.add.sprite(324, 225, 'dudeS');
   	   	   game.physics.arcade.enable(player);
   	   }
   	   doorO = game.add.group();
   	   doorO.enableBody = true;
   	   map.createFromObjects('door', 58, 'door', 0, true, false, doorO);
   	   mallet = game.add.group();
   	   mallet.enableBody = true;
   	   map.createFromObjects('mallet', 111, 'mallet', 0, true, false, mallet);
}
   //create the car objects and the car animations
   function createCars(){
/* */ 	   carB = game.add.sprite(222, 287, 'carB', 0);
   	   game.physics.arcade.enable(carB);
   	   carB.animations.add('burn', [5,6], 10, true, true);
/* */  	   carR = game.add.sprite(264, 375, 'carR', 0);
   	   game.physics.arcade.enable(carR);
   	   carR.animations.add('burn', [5,6], 10, true, true);   	   
/* */  	   carG = game.add.sprite(265, 864, 'carG', 0);	 
   	   game.physics.arcade.enable(carG);
   	   carG.animations.add('burn', [5,6], 10, true, true);
/* */  	   carRR = game.add.sprite(226, 666, 'carR', 0);
   	   game.physics.arcade.enable(carRR);
   	   carRR.animations.add('burn', [5,6], 10, true, true);
/* */  	   carGG = game.add.sprite(265, 579, 'carG', 0);
  	   game.physics.arcade.enable(carGG);
   	   carGG.animations.add('burn', [5,6], 10, true, true);
/* */ 	   carB2 = game.add.sprite(610, 664, 'carB2', 0);
   	   game.physics.arcade.enable(carB2);
   	   carB2.animations.add('burn', [5,6], 10, true, true);
/* */  	   carR2 = game.add.sprite(582, 864, 'carR2', 0);
   	   game.physics.arcade.enable(carR2);
   	   carR2.animations.add('burn', [5,6], 10, true, true);
/* */  	   carG2 = game.add.sprite(583, 579, 'carG2', 0);
   	   game.physics.arcade.enable(carG2);
   	   carG2.animations.add('burn', [5,6], 10, true, true);
/* */  	   carBB2 = game.add.sprite(582, 375, 'carB2', 0);
   	   game.physics.arcade.enable(carBB2);
   	   carBB2.animations.add('burn', [5,6], 10, true, true);
/* */  	   carRR2 = game.add.sprite(616, 287, 'carR2', 0);
   	   game.physics.arcade.enable(carRR2);
   	   carRR2.animations.add('burn', [5,6], 10, true, true);
/* */  	   
   	   cars = game.add.group();
   	   cars.enableBody = true;
   	   cars.add(carB);
   	   cars.add(carR);
   	   cars.add(carG);
   	   cars.add(carRR);
   	   cars.add(carGG);
   	   cars.add(carB2);
   	   cars.add(carR2);
   	   cars.add(carG2);
   	   cars.add(carBB2);
   	   cars.add(carRR2);
   }
   //end game 
   function jail(){
   	   timer.stop();
   	   var end = game.add.sprite(0,0,'jail');
   	   game.camera.reset();
   	   game.camera.follow(end);
   }
   function win(){
   	   timer.stop();
   	   var win = game.add.sprite(0,0, 'win');
   	   game.camera.reset();
   	   game.camera.follow(win);
   	   var style =  { font: "bold 25px Verdana", fill: "#FFFFFF", align: "center" };
   	   if(score == 0){
   	   	   var winText = game.add.text(35, 50, 'You may have escaped without getting \n caught but you did not finish the job! \n Your actions have cause problems!', style);
   	   }
   	   else if(score == 525000){
   	   	   var winText = game.add.text(35, 50, 'You have destoryed the Sports Car \nDelaership and escaped without being \ncaught! Your job here is done.', style);
   	   }
   	   else{
   	   	   var winText = game.add.text(35, 10, 'You have destoryed most of the \nSports Car Dealership and escaped \nwithout being caught! But there are \nstill some cars still in there. \nYour job here is done, \nwe\'ll get someone else to finish the job.', style);
   	   }
   	   var finalScore = game.add.text(115, 550, 'Amount of Damage caused: \n$' + String(score), style);
	}
};
