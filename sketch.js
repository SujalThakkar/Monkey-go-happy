var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var bananas

var fruit,appleimage;
var groundImage ;
var gameover

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground1.png");
  
 
}
function setup() {
  createCanvas(400,400)
  monkey = createSprite(50,300,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
 monkey.debug = false;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 
  ground = createSprite(20,380,800,10);
  
 
  
  FoodGroup = createGroup();
  
  obstacleGroup = createGroup();
  
  score = 0 ;
 }


function draw() {
  background("#3ADDC8 ")
// background(rgb(170, 238, 11))
 // background("white") 
  text("Survival Time: "+ score, 150,40);
  
  if (gameState === PLAY){
    
      score = score + Math.round(getFrameRate()/60);
    
    if(FoodGroup.isTouching(monkey)){
     // score = score + 1
      FoodGroup.destroyEach();
    }
  
     ground.velocityX = -(6 + 3* score/100)
  
  if(keyDown("space")&& monkey.y >= 320){
    monkey.velocityY = -14 
  }
  
    monkey.velocityY = monkey.velocityY + 0.7
  
  monkey.collide(ground);
  
  if(ground.x < 0 ){
    ground.x = ground.width/2;
  }
    
  spawnobstacle();
  
  spawnbanana();
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocity = 0
   gameState = END ;
  }
  } else if(gameState === END){
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  }
  

  drawSprites();
}

function spawnobstacle(){
  if(frameCount%100 === 0){
    var  obstacle = createSprite(399,360,20,20)
    obstacle.velocityX = -4
    obstacle.addImage(obstacleImage);
     obstacle.setCollider("circle",4,4);
    obstacle.scale = 0.1
    obstacle.lifetime = 100
    obstacleGroup.add(obstacle);
  }
}

function spawnbanana(){
 if (frameCount%220 === 0){
  var banana = createSprite(399,Math.round(random(200,300)),20,20);
   banana.velocityX = -5;
   banana.addImage(bananaImage);
   banana.scale = 0.1
   banana.lifetime = 100
    FoodGroup.add(banana);
 
 }
  
 }