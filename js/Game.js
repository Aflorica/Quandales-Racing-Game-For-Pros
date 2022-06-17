class Game {
  constructor() {
 this.resetTitle=createElement("h2")   
 this.resetButton=createButton("")

this.leaderBoardTitle=createElement("h2")
this.leader1=createElement("h2")
this.leader2=createElement("h2")



  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount=player.getCount()

   car1 = createSprite(width/2-100,height-100)
   car1.addImage("car1",car1Img)
   car1.scale=0.07

   car2 = createSprite(width/2+100,height-100)
   car2.addImage("car2",car2Img)
   car2.scale=0.07

   cars = [car1,car2]

   // creating the groups for different sprite objects because i am cool jajaja
   fuels=new Group()
   powerCoins=new Group()
   obstacles=new Group()
   var obstaclesPositions=[
    {x:width/2+250,y:height-800,image:obstacle1Img},
    {x:width/2-150,y:height-1300,image:obstacle2Img},
    {x:width/2+250,y:height-1800,image:obstacle1Img},
    {x:width/2-180,y:height-2300,image:obstacle2Img},
    {x:width/2,y:height-2800,image:obstacle1Img},
    {x:width/2-180,y:height-3300,image:obstacle2Img},
    {x:width/2+180,y:height-3300,image:obstacle2Img},
    {x:width/2+250,y:height-3800,image:obstacle1Img},
    {x:width/2-150,y:height-4300,image:obstacle2Img},
    {x:width/2+250,y:height-4800,image:obstacle1Img},
    {x:width/2,y:height-5300,image:obstacle1Img},
    {x:width/2-180,y:height-5500,image:obstacle2Img},
   ]

   // adding fuel sprite in the game ajjaja
   this.addSprites(fuels,4,fuelImg,0.02)
   // adding coinSprites
   this.addSprites(powerCoins,20,powerCoinImg,0.1)
   // adding all of the obstacles
   this.addSprites(obstacles,obstaclesPositions.length,obstacle1Img,0.04,obstaclesPositions)
  }
   addSprites(spriteGroup,numberOfSprites,spriteImg,scale,positions=[]){
   for (var i=0;i<numberOfSprites;i++){
     var x,y
     if (positions.length>0){
      x=positions[i].x
      y=positions[i].y
      spriteImg=positions[i].image
     }
     else {
      x=random(width/2-150,width/2+150)
      y=random(-height*4.5,height-400)
     }
     

     var sprite=createSprite(x,y)
     sprite.addImage("sprite",spriteImg)
     sprite.scale=scale
     spriteGroup.add(sprite)
   }
  }
  getState(){
  var Huandale_Pringle=database.ref("gameState")
  Huandale_Pringle.on("value",function(data){
gameState=data.val()

  })
  }
  updateState(state){
database.ref("/").update({
"gameState":state
})
  }
  handleElements(){
    form.hide()
    form.titleImg.position(40,50)
 form.titleImg.class("gameTitleAfterEffect")
 this.resetTitle.html("Reset Game")
 this.resetTitle.class("resetText")
 this.resetTitle.position(width/2+200,40)

 this.resetButton.class("resetButton")
 this.resetButton.position(width/2+230,100)

this.leaderBoardTitle.html("LeaderBoard")
this.leaderBoardTitle.class("resetText")
this.leaderBoardTitle.position(width/3-60,40)

this.leader1.class("leadersText")
this.leader1.position(width/3-50,80)

this.leader2.class("leadersText")
this.leader2.position(width/3-50,130)
  }
  showLeaderBoard(){
  var leader1
  var leader2

  var players=Object.values(allPlayers)
  
  if ((players[0].rank==0 && players[1].rank==0) || players[0].rank==1){
    //&emsp;this tag is used for displaying 4 spaces
    leader1=players[0].rank+"&emsp;"+players[0].name+"&emsp;"+players[0].score
    leader2=players[1].rank+"&emsp;"+players[1].name+"&emsp;"+players[1].score
  }
  if (players[1].rank==1){
    leader1=players[1].rank+"&emsp;"+players[1].name+"&emsp;"+players[1].score
    leader2=players[0].rank+"&emsp;"+players[0].name+"&emsp;"+players[0].score
  }
  this.leader1.html(leader1)
  this.leader2.html(leader2)
  }

handlePlayerControls(){
  if (keyIsDown(UP_ARROW)){
    player.positionY=player.positionY+10
    player.update()
  }
  if (keyIsDown(LEFT_ARROW) && player.positionX>width/3-50){
  player.positionX=player.positionX-5
  player.update()
  }
  if (keyIsDown(RIGHT_ARROW) && player.positionX<width/2+300){
    player.positionX=player.positionX+5
    player.update()
  }
}


handleResetButton(){
  this.resetButton.mousePressed(()=>{
    database.ref("/").set({
      playerCount:0,
      gameState:0,
      players:{}
    })
    window.location.reload()
  })
}
handleFuel(index){
// adding fuel if the car touches the fuel tank
cars[index-1].overlap(fuels,function(collector,collected){
  player.fuel=185
  // collected is the sprite in the group collectables that triggered
  collected.remove()
})
}
handlePowerCoins(index){
  cars[index-1].overlap(powerCoins,function(collector,collected){
    player.score=player.score+5
    player.update()
    collected.remove()
  })
}


play (){
  this.handleElements()
  this.handleResetButton()
 Player.getPlayersInfo()
 if (allPlayers!==undefined){
   image (trackImg,0,-height*5,width,height*6)
   this.showLeaderBoard()

   var index=0
   for (var plr in allPlayers){
     index=index+1
     var x=allPlayers[plr].positionX
     var y=height-allPlayers[plr].positionY
    
     cars[index-1].position.x=x
     cars[index-1].position.y=y
     if (index==player.index){
     fill("blue")
     stroke("lime")
     ellipse(x,y,65,65)

     this.handleFuel(index)
     this.handlePowerCoins(index)
     


     camera.position.x=cars[index-1].position.x
     camera.position.y=cars[index-1].position.y





     }

   }
   this.handlePlayerControls()
   drawSprites()
 }
}



}
