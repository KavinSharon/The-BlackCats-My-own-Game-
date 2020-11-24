const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bg;
var soldier, soldierImage, enemyMove;
var winterbg;
var canvas;

var ground;
var platform = []

var enemyBulletGroup
var edges;

var inviGroup;

var visiblity = 255

var bgImg;

var enemyExists = "false"


//var scrollSpeed = 2;

function preload() {
  bgImg = loadImage("sprites/forest.png.png") 
  soldierRunImage = loadAnimation("sprites/soldier03(R1).png","sprites/soldier03(R2).png","sprites/soldier03(R3).png","sprites/soldier03(R4).png","sprites/soldier03(R5).png","sprites/soldier03(R6).png")
  salaryImage = loadImage("sprites/salary.png")
  soldierDuckImage = loadAnimation("sprites/soldier03(D1).png","sprites/soldier03(D2).png","sprites/soldier03(D3).png")
  soldierJumpImage = loadAnimation("sprites/soldier03(J1).png","sprites/soldier03(J2).png","sprites/soldier03(J3).png","sprites/soldier03(J4).png","sprites/soldier03(J5).png")
  enemyImage = loadImage("sprites/SOLDIER_left.png")
  bulletImage = loadImage ("sprites/bullet.png")
  bulletLImage = loadImage ("sprites/BulletLeft.png")
}

function setup(){
    canvas = createCanvas(1200,500);

    x2 = width;


    engine = Engine.create();
    world = engine.world;

    bg = createSprite(0,height/2,width,height)
    bg.addImage("bg",bgImg)
    bg.scale = 4

    edge = createSprite(0,250,20,500)

    soldier = createSprite(200,350,30,30)
    soldier.addAnimation("sr",soldierRunImage);
    soldier.addAnimation("jm",soldierJumpImage);
    soldier.addAnimation("duck",soldierDuckImage);
    soldier.scale = 2
    soldier.debug = true;
    soldier.setCollider("rectangle", 0 ,0 ,40,80)

    ground = createSprite(1200,490,1200,10)
    ground.visible = true

    inviGroup = new Group();
    enemyGroup = new Group();
    bulletGroup = new Group();
    enemyBulletGroup = new Group();

       

}



function draw(){
     background(0);

    //  image(bgImg, x1, 0, width, height);
    //  image(bgImg, x2, 0, width, height);
     
    //  x1 -= scrollSpeed;
    //  x2 -= scrollSpeed;
     
    //  if (x1 < -soldier.x){
    //    x1 = width;
    //  }
    //  if (x2 < -soldier.x){
    //    x2 = width;
    //  }
 
    drawSprites();
    Engine.update(engine);
     
    if(keyDown("right")){
      soldier.x = soldier.x + 5
      soldier.changeAnimation("sr",soldierRunImage);
    }

     if(keyDown("left")){
      soldier.x = soldier.x - 5
      soldier.changeAnimation("sr",soldierRunImage); 
    }

    if(keyDown("space") && soldier.y>200) {
      soldier.velocityY = -10
      soldier.changeAnimation("jm",soldierJumpImage);
      
    }
    
    
  
  soldier.velocityY = soldier.velocityY + 0.5
  soldier.collide(ground)
  soldier.collide(inviGroup)
  soldier.collide(edge)


if(soldier.x % 200 === 0){
 bg.x = soldier.x + 100
}
    
    if(soldier.x > ground.x ){
        ground.x = soldier.x +100;
    } else if (soldier.x < 800) {
        ground.x = soldier.x - 500 
    }
    camera.position.x = soldier.x +400
 

    if(soldier.x % 1000 === 0 ){
      platform.push(new Platform (camera.x+800,random(340,345),400,20))

      for(var i=0;i<platform.length;i++){
      invisiblePlatform = createSprite(camera.x+800,platform[i].body.position.y,400,20)
      invisiblePlatform.shapeColor = "brown"
      spawnSalary(i);
      platform.pop();
      
      inviGroup.add(invisiblePlatform)
      //inviGroup.setLifetimeEach(400);
      
      }
       
    }
    

    if(keyWentDown("s")){
      createBullets();

    }

    if(bulletGroup.isTouching(enemyGroup)){
      enemyGroup.destroyEach();
      bulletGroup.destroyEach();
      enemyBulletGroup.destroyEach();
      enemyExists = "false"
    }

    if(enemyGroup.isTouching(soldier)){
      enemyGroup.setVelocityXEach(-4)
      enemyBulletGroup.setVelocityXEach(-30)
      if(enemyBulletGroup.isTouching(soldier)){
        enemyBulletGroup.destroyEach();
      }
      
    }

    if(salaryGroup.isTouching(soldier)){
      salaryGroup.destroyEach();
    }

    for(var  i=0; i< enemyGroup.length; i++){
      if(enemyGroup.get(i).x -soldier.x < 1000 ){
        enemyGroup.get(i).velocityX= -3
      
        if(frameCount% 50===0){
        createEnemyBullet();
        } 
      }else {
          enemyGroup.setVelocityXEach(0)
        }

    spawnEnemies();
   
   console.log(soldier.x);
   
 
    

}

function spawnEnemies(){
  if(soldier.x% 1300 === 0 ){
    var enemy = createSprite(camera.x + 800, 410, 20,50);
    enemy.scale = 0.3
    enemy.addImage("enemy", enemyImage)
    enemy.setCollider("rectangle",-1800,0, 4000,enemy.height)
    enemy.debug = true;
    enemyExists = "true"
    //enemy.collide(ground);
    //enemy.velocityY = 0.5;    
  
    enemyGroup.add(enemy)
   
    enemyBullet = createSprite(enemy.x -60,enemy.y-3,10,10)
    enemyBullet.addImage("bulletE",bulletLImage)
    enemyBullet.scale = 0.1;

    enemyBulletGroup.add(enemyBullet)
    console.log(enemy.x);
    return enemyGroup;
  }
  }


function createBullets(){
  bullet = createSprite(soldier.x +60,soldier.y-2,10,10)
  bullet.addImage("bullet",bulletImage)
  bullet.scale = 0.03;
  bullet.velocityX = 30

  bulletGroup.add(bullet)

  return bulletGroup

}

function createEnemyBullet() {
  for(var  i=0; i< enemyGroup.length; i++){
  enemyBullet = createSprite(enemyGroup.get(i).x,enemyGroup.get(i).y-3,10,10)
  enemyBullet.addImage("bulletE",bulletLImage)
  enemyBullet.scale = 0.1;
  enemyBullet.velocityX = -30

  enemyBulletGroup.add(enemyBullet)
  }
}

function spawnSalary(pos){
  
  if(frameCount%200 === 0){
  var position = Math.round(random(1,2)) ;
  if(position ===1){
    salary = createSprite(camera.x+500,410,20,20);
    salary.scale = 0.05;
    salary.addImage("sal",salaryImage);
  }
  else if(position === 2){
    salary = createSprite(camera.x+500,platform[pos].y,20,20);
    salary.scale = 0.05;
    salary.addImage("sal",salaryImage);
  }
  salaryGroup.add(salary);
}

}
}


