//To create Sprites
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloud_image;
var score = 0;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,
    obstacle6,obstacle;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImage;
var gameOver, gameOverImage;
var jumpSound, dieSound, checkPointSound;
var message;
message = "This is the TREX Game."


//To load Images, Animations and Sounds.
function preload()
{
trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
trex_collided = loadAnimation("trex_collided.png");
groundImage = loadImage("ground2.png");
cloud_image = loadImage("cloud.png");
restartImage = loadImage("restart.png");
gameOverImage = loadImage("gameOver.png");
obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle2.png")
obstacle3 = loadImage("obstacle3.png")
obstacle4 = loadImage("obstacle4.png")
obstacle5 = loadImage("obstacle5.png")
obstacle6 = loadImage("obstacle6.png")
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkPointSound = loadSound("checkPoint.mp3");
}


//Creating a Space for the Game.
function setup() {
createCanvas(600,200)
  
//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("TREX",trex_collided);
trex.scale = 0.5;
  
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
    
  restart = createSprite(300,100);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  
  gameOver = createSprite(300,50);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1.5;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  //console.log(rand)

 // trex.debug = true;
  trex.setCollider ("circle",0,0,40);
 // trex.setCollider("rectangle",0,0,300,trex.height);
  
  cloudsGroup = createGroup()
  obstaclesGroup = createGroup()
}

//To repeat a function continuously
function draw() 
{
  //set background color
  background("cyan");
  
  text("Score : " + score, 510,70);
  
  
  if(gameState === PLAY)
  {
   ground.velocityX = -(4 + score/200);
   score = score+ Math.round(frameCount / 60)
   restart.visible = false;
   gameOver.visible = false;
    
    if(score < 0 && score % 100 === 0)
      {
        checkPointSound.play();
      }
    
   if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }
    
    if(keyDown("space")&& trex.y >= 150) {
    trex.velocityY = -10;
      jumpSound.play(); 
      
        
  }
  
  //Making the Trex jump up 
  trex.velocityY = trex.velocityY + 0.8
    
    //Spawn Clouds
    spawnClouds()
    
    //Spawn Obstacles
    spawnObstacles()
    
    if (obstaclesGroup.isTouching(trex))
    {
      gameState = END;
      dieSound.play();
     // trex.velocityY = -12;
    // jumpSound.play();
    }
  }
  else if (gameState === END)
  {
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("TREX",trex_collided);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)) 
  {
    reset()
  }
  }
  
  //To count the frames
  console.log(frameCount);
  
    console.log (message)
  //stop trex from falling down
  trex.collide(invisibleGround);
 
  //To show the Created Sprites
  drawSprites();
    
}

//function to spawn the clouds
function spawnClouds()
{
  if(frameCount % 150 === 0)
    {
 var cloud = createSprite(600,20,20,20);
  cloud.velocityX = -4
      cloud.addImage(cloud_image);
      cloud.scale = 0.5; 
      cloud.y = Math.round(random(10,60))
      cloud.depth = trex.depth 
      trex.depth = trex.depth +1
      cloud.lifetime = 205;
      cloudsGroup.add(cloud);
    }
      
  }

//function for obstacles
function spawnObstacles()
{ 
  if(frameCount % 100 === 0)
    {
  obstacle = createSprite(595 ,165,20,20);
  obstacle.velocityX = -(5 + score/200);
  var rand = Math.round(random(1,6))
  
  //Generate random obstacles out of 6 images
  switch(rand)
    {
      case 1: obstacle.addImage (obstacle1); break;
      case 2: obstacle.addImage (obstacle2); break;
      case 3: obstacle.addImage (obstacle3); break;
      case 4: obstacle.addImage (obstacle4); break;
      case 5: obstacle.addImage (obstacle5); break;
      case 6: obstacle.addImage (obstacle6); break;
      
      default: break;
    }
      obstacle.scale = 0.5;   
      obstacle.lifetime = 205;
      obstaclesGroup.add(obstacle);
    }
}

  function reset()
  {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach(); 
    cloudsGroup.destroyEach();
    trex.changeAnimation("running", trex_running);
    score = 0;
  }
  
  
