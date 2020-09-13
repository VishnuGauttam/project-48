var PLAY = 1;
var END = 0;
var START=2
var gameState = START;

var sky,  groundImage;
var jet,playerImage;
var bulletGroup,bullet;
var shootImage;
var rocksImage;
var metoriodGroup;
var frameCount2=0
var playerScore = 0;
var enmyGroup,enmyImage;
var logGroup,logImage;
var restart,restartImage
var bonusGroup,bonusImage
var secondImage
var trailSound
var blastImage
var blastSoundS
var superSound
var fuel=5000
var startImage
var button,buttonImage
var fuelGroup,fuelImage
var wall,wall1
var wall2
var bonusSound
var fuelSound
var spaceImage
var start

function preload(){

  groundImage = loadImage("sky.jpg");
  playerImage = loadImage("jet.png");
  shootImage = loadImage("PinClipart.com_missile-clip-art_625813.png");
  rocksImage = loadImage("Asteroid-news-large-space-rocks-flying-Earth-NASA-asteroid-tracker-nasa-news-1194086.png");
  enmyImage = loadImage("ClipartKey_1388293.png");
  logImage = loadImage("wood2.png");
  restartImage = loadImage("1_MNQjawAapo80q-65Up1GxQ.png");
  bonusImage=loadImage("red.png")
  secondImage=loadImage("Full Moon - background.png")
  trailSound=loadSound("Anti Aircraft Gun-SoundBible.com-1303768514.mp3")
  blastImage=loadImage("images.png")
  blastSound=loadSound("Blast-SoundBible.com-2068539061.mp3")
  superSound=loadSound("SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3")
  startImage=loadImage("1508252860-space-games-pc.jpg")
  buttonImage=loadImage("pngtree-european-and-american-wind-game-ui-icon-start-play-button-iconui-png-image_4047382.png")
  fuelImage=loadImage("jet fuel (1).png")
bonusSound=loadSound("sms-alert-5-daniel_simon.mp3")
fuelSound=loadSound("Blop-Mark_DiAngelo-79054334.mp3")
spaceImage=loadImage("KSr7P3.jpg")


}

function setup() {
 createCanvas(550, 550);

 sky = createSprite(250,250,400,400);
 sky.addImage("ground",groundImage);
 sky.addImage("second",secondImage)
 //sky.addImage("start",startImage)
sky.addImage("space",spaceImage)
 sky.scale=1
 sky.y = sky.height /2;
 sky.velocityY=-4

 jet = createSprite(250,480,400,400);
 jet.addImage("player",playerImage);
 jet.scale=0.3
 jet.addImage("blast",blastImage)



 start=createSprite(200,200)
 start.addImage("start",startImage)


 

 restart = createSprite(284,280);
 restart.addImage(restartImage);
 restart.scale=0.2
 button = createSprite(300,493,400,400);
 button.addImage("button",buttonImage)
 button.scale=0.5

 wall = createSprite(0,388,20,1000);
 wall1 = createSprite(550,0,20,1000);
 wall2= createSprite(250,549,1000,20);









 

 button.visible=false
 restart.visible=false
 wall.visible=false
 wall1.visible=false
 wall2.visible=false


 bulletGroup = new Group();
 metoriodGroup = new Group();
 enmyGroup = new Group();
 logGroup = new Group();
 bonusGroup=new Group();
 fuelGroup=new Group();
}

function draw() {

  background(255);
  if(gameState===START){
    button.visible=true
    sky.changeImage("start",startImage)
    sky.velocityY=0
    jet.visible=false
   
    if(mousePressedOver(button)){
      gameState=PLAY
    }
    
  }
 if (gameState===PLAY){
   button.visible=false
   jet.visible=true



   start.visible=false
  sky.changeImage("ground",groundImage);
  sky.velocityY=-4

    fuel=fuel-1
    text("hello",271,274)

    
jet.collide(wall)
jet.collide(wall1)
jet.collide(wall2)

 if (sky.y<0){
     sky.y = sky.height/2;
    }
     

 if(keyWentDown("UP_ARROW")){
    jet.velocityX=0
    jet.velocityY=-3
    }
    
 if(keyWentDown("DOWN_ARROW")){
    jet.velocityX=0
    jet.velocityY=3
    }
  
 if(keyWentDown("RIGHT_ARROW")){
     jet.velocityX=4                   
     jet.velocityY=0
    }
    
 if(keyWentDown("LEFT_ARROW")){
     jet.velocityX=-4
     jet.velocityY=0
    }

if(touches.lenght>0||keyDown("space")&&World.frameCount-frameCount2>25){
    var bullet = createSprite(jet.x,jet.y,20,20);
    bullet.addImage(shootImage);
    bullet.scale=0.06
    bullet.velocityY=-5
    frameCount2=World.frameCount
    trailSound.play();
    bulletGroup.add(bullet);
    
    }   
        
 if(enmyGroup.isTouching(bulletGroup)){
    enmyGroup.destroyEach()
    playerScore=playerScore+20
      }
    
 if( metoriodGroup.isTouching(bulletGroup)){
      metoriodGroup.destroyEach()
      playerScore=playerScore+10
    }
    

if(enmyGroup.isTouching(jet)){
    gameState = END;
  jet.changeImage("blast",blastImage)
   jet.scale=1
   blastSound.play()
  }

if(metoriodGroup.isTouching(jet)){
    gameState = END;
    jet.changeImage("blast",blastImage)
    jet.scale=1
    blastSound.play()
  }

if(logGroup.isTouching(jet)){
    gameState = END;
    jet.changeImage("blast",blastImage)
    jet.scale=1
    blastSound.play()
  }

if(bonusGroup.isTouching(jet)){
  bonusGroup.destroyEach()
  playerScore=playerScore+50
  bonusSound.play()
  
}

if(playerScore>250){
  sky.changeImage("second",secondImage)
  sky.scale=1

}

if(fuel===0){
  gameState=END
}

if(fuelGroup.isTouching(jet)){
  fuelGroup.destroyEach()
  fuel=fuel+2000
  fuelSound.play()
}

if(playerScore>550){
  sky.changeImage("space",spaceImage)
} 
rockss();
enmys();
logs();
bonus();
fuels();

  }
  else if (gameState === END) {
    sky.velocityY=0
      metoriodGroup.setVelocityYEach(0);
      metoriodGroup.setLifetimeEach(-1)

      enmyGroup.setVelocityXEach(0);
      enmyGroup.setLifetimeEach(-1);

      logGroup.setVelocityYEach(0);
      logGroup.setLifetimeEach(-1);

    restart.visible=true
 if(mousePressedOver(restart)) {
     reset();
    }
   
  }
   
  
  
  drawSprites();



  
  textSize(25)
  
  fill("red")
  text("score="+playerScore, 440,38);
  text(mouseX+","+mouseY,250,255)
  text("fuel"+fuel,450,59)
  
}


function rockss(){
  if(World.frameCount%80===0){
    var rocks = createSprite(random(30,550),0,20,20);
    rocks.addImage(rocksImage)
    rocks.scale=random(0.2,0.4)
    rocks.velocityY=5
    rocks.lifetime=110
    metoriodGroup.add(rocks);
    
    
  }       
  }

  function enmys(){
    if(World.frameCount%120===0){
      var enmy = createSprite(40, random(20,250),20,20)
      enmy.addImage(enmyImage)
      enmy.scale=0.2
      enmy.velocityX=5
      enmy.lifetime=110
      enmyGroup.add(enmy);
      
    }       
    }


    function logs(){
      if(World.frameCount%250===0){
        var log = createSprite(random(50,550), 0,20,20);
   
        log.scale=random(1,2)
        log.velocityY=5
        log.lifetime=110
        log.addImage(logImage)
        logGroup.add(log)
        
      }  
    }


    function reset(){
      gameState=PLAY
      jet.changeImage("player",playerImage)
      jet.scale=0.3
      sky.velocityY=-4
      restart.visible=false
      playerScore=0
      enmyGroup.destroyEach()
      logGroup.destroyEach()
      metoriodGroup.destroyEach()
      bonusGroup.destroyEach()
      fuelGroup.destroyEach()
      fuel=5000
    }
    
    
    function bonus(){
      if(World.frameCount%400===0){
        var star = createSprite(random(50,550),0,20,20)
        star.velocityY=2
        star.scale=0.5
        star.addImage(bonusImage)
        bonusGroup.add(star)
      }
    }

    function fuels(){
      if(World.frameCount%600===0){
        var fuel = createSprite(random(50,550),0,20,20)
        fuel.velocityY=2
        fuel.scale=0.3
        fuel.addImage(fuelImage)
        fuelGroup.add(fuel)
      }
    }
    
    