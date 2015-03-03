window.onload = function() {
    
    "use strict";
    
    
    var game = new Phaser.Game( 640, 640, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render} );
    
    function preload() {
       game.load.tilemap('street', 'assets/street.json', null, Phaser.Tilemap.TILED_JSON);
       game.load.image('streetTiles', 'assets/tileSet.png');
       game.load.tilemap('dealer', 'assets/dealership.json', null, Phaser.Tilemap.TILED_JSON);
       game.load.image('dealerTiles', 'assets/dealershipTileset.png');
       game.load.image('door', 'assets/door.png');
       game.load.image('door2', 'assets/door2.png');
       game.load.image('doorS', 'assets/doorS.png');
       game.load.image('dude', 'assets/dude.png');
       game.load.image('exit', 'assets/exit.png');
       game.load.image('lazerR', 'assets/lazerR.png');
       game.load.image('lazerU', 'assets/lazerU.png');
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
    var door, door2, doorS, exit;
    var player, player2;
    var cursors;
    var carB, carB2, carG, carG2, carR, carR2;
    var carBB, carBB2, carGG, carGG2, carRR, carRR2
    var cars;
    var ifStreet = true, ifDealer = false, ifSecrate = false;
    var swing;
    var scoreText;
    var score = 0;
    var swingNum = 0;
    var lazerRs, lazerUs
    
   function create(){
   	  loadStreet();
   	  player2 = game.add.sprite(500, 500, 'dude');
   	   game.physics.arcade.enable(player2);
   	   player2.kill();
   	   
   	  cursors = game.input.keyboard.createCursorKeys();
   	  swing = game.input.keyboard.addKey(Phaser.Keyboard.Q);
   	  game.camera.follow(player);
   	  
   }
    
   function update(){
    	   game.physics.arcade.collide(player, blockTile);
    	   game.physics.arcade.overlap(player, door, enterD, null, this);
    	   game.physics.arcade.overlap(player, door2, enterD, null, this);
    	   game.physics.arcade.overlap(player, doorS, enterS, null, this);
    	   if(ifDealer){
    	   	   game.physics.arcade.collide(player2, blockTile2);
		   game.physics.arcade.collide(cars, blockTile2);
		   game.physics.arcade.overlap(player2, lazerRs, popo, null, this);
		   game.physics.arcade.overlap(player2, lazerUs, popo, null, this);
		   
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
   	   if(player.alive){
		   player.body.velocity.x = 0;
		   player.body.velocity.y = 0;
		   if(cursors.left.isDown){
			   player.body.velocity.x = -280;
		   }
		   else if(cursors.right.isDown){
			   player.body.velocity.x = 280;
		   }
		   if(cursors.up.isDown){
			   player.body.velocity.y = -280;
		   }
		   else if(cursors.down.isDown){
			   player.body.velocity.y = 280;
		   }
   	   }
   	   if(player2.alive){
		   player2.body.velocity.x = 0;
		   player2.body.velocity.y = 0;
		   if(cursors.left.isDown){
			   player2.body.velocity.x = -280;
		   }
		   else if(cursors.right.isDown){
			   player2.body.velocity.x = 280;
		   }
		   if(cursors.up.isDown){
			   player2.body.velocity.y = -280;
		   }
		   else if(cursors.down.isDown){
			   player2.body.velocity.y = 280;
		   }
   	   }
   }
   function enterD(play, doo){
   	   game.camera.reset();
   	   player.kill();
   	   map.destroy();
   	   loadDealer();
   	   game.camera.follow(player2);
   	   
   	   
   }
   function enterS(play, doo){
   	   loadS();
   }
   function exitD(play, doo){
   	   game.camera.reset();
   	   player2.destroy();
   	   map.destroy();
   	   loadStreet(); 
   	   player.reset(154, 332);
   	   game.camera.follow(player);
   }
   function damCar(play, car){
   	   if(swing.downDuration(1)){
   	   	 if(car.frame < 5){
   	   	 	 swingNum++;
   	   	 	 score += 100;
   	   	 	 scoreText.setText("Score: $" + String(score));
   	   	 	 if(swingNum === 5){
   	   	 	 	 car.frame += 1;
   	   	 	 	 swingNum = 0;
   	   	 	 	 score += 10000;
   	   	 	 	 scoreText.setText("Score: $" + String(score));
   	   	 	 }
   	   	 }
   	   	 if(car.frame > 4){
   	   	 	car.animations.play('burn'); 
   	   	 }
   	   }
   }
   function popo(play, laze){
   	   
   }
   function loadStreet(){
   	   map = game.add.tilemap('street');
   	   map.addTilesetImage('tileSet', 'streetTiles');
   	   var backgroundLayer = map.createLayer('background');
   	   blockTile = map.createLayer('blocked');
   	   map.setCollisionBetween(1, 100, true, 'blocked');
   	   backgroundLayer.resizeWorld();
   	   player = game.add.sprite(300, 976, 'dude');
   	  game.physics.arcade.enable(player);
   	   door = game.add.group();
   	   door.enableBody = true;
   	   map.createFromObjects('door', 58, 'door', 0, true, false, door);
   	   door2 = game.add.group();
   	   door2.enableBody = true;
   	   map.createFromObjects('door2', 59, 'door2', 0, true, false, door2);
   	   doorS = game.add.group();
   	   doorS.enableBody = true;
   	   map.createFromObjects('specialDoor', 41, 'doorS', 0, true, false, doorS);
   	   var styleS = { font: "bold 15px Verdana", fill: "#FFFFFF", align: "left" };
   	   scoreText = game.add.text(20, 10, 'Damage: $' + String(score), styleS);
   	   scoreText.fixedToCamera = true;
   }
   function loadDealer(){
   	   map = game.add.tilemap('dealer');
   	   map.addTilesetImage('dealershipTileset', 'dealerTiles');
   	   var backgroundLayer = map.createLayer('background');
   	   blockTile2 = map.createLayer('blocked');
   	   map.setCollisionBetween(1, 100, true, 'blocked');
   	   backgroundLayer.resizeWorld();
   	   player2 = game.add.sprite(480, 868, 'dude');
   	   game.physics.arcade.enable(player2);
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
   	   var styleS = { font: "bold 15px Verdana", fill: "#000000", align: "left" };
   	   scoreText = game.add.text(20, 10, 'Damage: $' + String(score), styleS);
   	   scoreText.fixedToCamera = true;
   }
   function loadS(){
   	   
   }
   function createCars(){
   	   carB = game.add.sprite(222, 287, 'carB', 0);
   	   game.physics.arcade.enable(carB);
   	   carB.animations.add('burn', [5,6], 10, true, true);
   	   
   	   carR = game.add.sprite(264, 375, 'carR', 0);
   	   game.physics.arcade.enable(carR);
   	   carR.animations.add('burn', [5,6], 10, true, true);
   	   
   	   
   	   carG = game.add.sprite(265, 864, 'carG', 0);	 
   	   game.physics.arcade.enable(carG);
   	   carG.animations.add('burn', [5,6], 10, true, true);
   	   
   	   carRR = game.add.sprite(226, 666, 'carR', 0);
   	   game.physics.arcade.enable(carRR);
   	   carRR.animations.add('burn', [5,6], 10, true, true);
  	   
   	   carGG = game.add.sprite(265, 579, 'carG', 0);
  	   game.physics.arcade.enable(carGG);
   	   carGG.animations.add('burn', [5,6], 10, true, true);
  	   
  	   carB2 = game.add.sprite(612, 666, 'carB2', 0);
   	   game.physics.arcade.enable(carB2);
   	   carB2.animations.add('burn', [5,6], 10, true, true);
   	   
   	   carR2 = game.add.sprite(582, 864, 'carR2', 0);
   	   game.physics.arcade.enable(carR2);
   	   carR2.animations.add('burn', [5,6], 10, true, true);
   	   
   	   carG2 = game.add.sprite(583, 579, 'carG2', 0);
   	   game.physics.arcade.enable(carG2);
   	   carG2.animations.add('burn', [5,6], 10, true, true);
   	   
   	   carBB2 = game.add.sprite(582, 375, 'carB2', 0);
   	   game.physics.arcade.enable(carBB2);
   	   carBB2.animations.add('burn', [5,6], 10, true, true);
   	   
   	   carRR2 = game.add.sprite(616, 287, 'carR2', 0);
   	   game.physics.arcade.enable(carRR2);
   	   carRR2.animations.add('burn', [5,6], 10, true, true);
   	   
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
   function render(){
   	   game.debug.spriteInfo(player, 32, 32);
   	   game.debug.pointer(game.input.mousePointer);
   }
};
