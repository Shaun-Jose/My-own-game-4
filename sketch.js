var ghost,hunter,bg,lantern
var score = 0;
var gameState = 'play'

function preload(){
ghostImage = loadImage('ghost3.png')
hunterImage = loadImage('b.png')
bgImage = loadImage('ghost-tree.jpg')
lanternImage = loadImage('lantern.png')
logImage = loadImage('log.png')
}
function setup(){
  createCanvas(800,800)
  bg = createSprite(0,0,800,800)
  bg.addImage(bgImage)
  bg.scale = 2 
  
  hunter = createSprite(100,300)
  hunter.addImage(hunterImage)
  hunter.scale = 0.4

  edges = createEdgeSprites()
  invisibleground = createSprite(0,800,2000,20)
  invisibleground.visible = false
  lanternGroup = new Group()
  logGroup = new Group()
 

}
function draw(){
  background(bgImage)
  if (gameState === 'play'){
    bg.velocityX= -2
    if (bg.x<0){
    bg.x = bg.width/2
    }
    if(keyDown('space')){
    hunter.y  = hunter.y - 25
    }
    hunter.velocityY = hunter.velocityY + 0.8
    spawnLanterns()
    spawnLog()
    if (lanternGroup.isTouching(hunter)){
      score = score +100
    }
    if (logGroup.isTouching(hunter)){
      score = score -50
    }
    if (score>5000){
     ghost = createSprite(700,300)
     ghost.addImage(ghostImage)
     ghost.scale = 0.6
     gameState = 'end'
         
    }
    drawSprites()
  }
  else if (gameState === 'end'){
    bg.velocityX = 0
    lanternGroup.destroyEach()
    logGroup.destroyEach()
    textSize(50)
    fill('white')
    text ('Game Over',200,200)

  }
  
  hunter.collide(invisibleground)
  
     

   
   fill ('white')
  textSize (30)
  text ('Score:'+score,550,50)


}
function spawnLanterns(){
  if (frameCount % 150===0){
    var lantern = createSprite(800,100,10,10)
    lantern.y = Math.round(random(120,200))
    lantern.addImage(lanternImage)
    lantern.scale = 0.2
    lantern.velocityX = -2
    lantern.lifetime = 400
    lanternGroup.add(lantern)


  }
}
function spawnLog(){
if (frameCount % 200===0){
  var log = createSprite(800,700,10,10)
  log.addImage(logImage)
  log.scale = 0.3
  log.velocityX = -3
  log.lifetime = 400
  logGroup.add(log)

}
}


