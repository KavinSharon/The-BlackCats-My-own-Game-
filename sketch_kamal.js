const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bg;
var soldier, soldierImage;
var winterbg;

var ground;
var platform = []

var edges;

var inviGroup;
var cols;
var rows;
var oldColValue = -1;

function preload() {
  winterbg = loadImage("sprites/bg-repeat.png") 
  soldierRImage = loadImage("sprites/SOLDIER_Right.png")
  enemyImage = loadImage("sprites/SOLDIER_left.png")
  bulletImage = loadImage ("sprites/bullet.png")
}

function setup(){
    var canvas = createCanvas(1600,700);

    // backgroundimage = loadImage("sprites/bg-repeat.png");
    
    // println(cols);

    engine = Engine.create();
    world = engine.world;

    
    // bg = createSprite(1150,200,2000,800)
    // bg.addImage("bg",winterbg)
    // bg.scale = 2.5

    soldier = createSprite(100,550,30,30)
    soldier.addImage("sr",soldierRImage)
    soldier.scale = 0.3
    soldier.debug = true;
    soldier.setCollider("rectangle", -100 ,0 ,200,500)

    ground = createSprite(800,690,1600,20)
    ground.visible = true

    inviGroup = new Group();

       

}

function bgRedraw() {
  
  cols = windowWidth/winterbg.width + oldColValue;
    rows = windowHeight/winterbg.height;
    if( winterbg.width%width > 0){cols++;}
    if( winterbg.height%height > 0){rows++;}
    for (var y=0; y<rows; y++){
      for (var x=0; x<cols; x++){
        image(winterbg,x*winterbg.width,y*winterbg.height);
      }
    }
}

function draw(){
    // background("transparent");
    
    var cols = 0;
    var rows = 0;
      cols = windowWidth/winterbg.width;
      oldColValue += cols;
        rows = windowHeight/winterbg.height;
        if( winterbg.width%width > 0){cols++;}
        if( winterbg.height%height > 0){rows++;}
        for (var y=0; y<rows; y++){
          for (var x=0; x<cols; x++){
            image(winterbg,x*winterbg.width,y*winterbg.height);
          }
        }
    drawSprites();
    Engine.update(engine);

    //  var SPos = soldier.body.position
    
    //  soldier.display()
     
     
    if(keyDown("right")){
      soldier.x = soldier.x + 5
      
    }

     if(keyDown("left")){
      soldier.x = soldier.x - 5
       
    }

    if(keyDown("space") && soldier.y>400) {
      
      soldier.velocityY = -10
       
  }
  soldier.velocityY = soldier.velocityY + 0.5
  soldier.collide(ground)
  soldier.collide(inviGroup)



    //bg.velocityX = -5
    if(soldier.x > ground.x ){
      // bg.x = 1150
      ground.x = soldier.x +100;
      bgRedraw();
      console.log("Width:", winterbg.width, "Height:", winterbg.height);
    }
    camera.position.x = soldier.x +600

   

    if(frameCount% 200 === 0 ){
      platform.push(new Platform (camera.x+800,random(500,600),200,20))

      for(var i=0;i<platform.length;i++){
      invisiblePlatform = createSprite(camera.x+800,platform[i].body.position.y,200,20)
      invisiblePlatform.shapeColor = "brown"
      platform.pop();
      
      inviGroup.add(invisiblePlatform)
      inviGroup.lifetime = 100;
      //invisiblePlatform.velocityX = -5
      }
       
    }
    

    for(var i=0;i<platform.length;i++){
      platform[i].display();
      //platform[i].move();
   
    }

    if(keyWentDown("s")){
      createBullets();
    }
  

}

function spawnEnemies(){
  if(frameCount% 200 === 0 ){
    var enemy = createSprite(camera.x + 1000, 665, 20,50);
    enemy.addImage("enemy", enemyImage)



}
}

function createBullets(){
  bullet = createSprite(soldier.x +60,soldier.y-2,10,10)
  bullet.addImage("bullet",bulletImage)
  bullet.scale = 0.03;
  bullet.velocityX = 30


}





