class Player {
  constructor() {
    this.name=null 
    this.index=null
    this.positionX=0
    this.positionY=0
    this.rank=0
    this.score=0
    this.fuel=185
  }
  getCount(){
    var James_Bartholowme_Junior_Nut=database.ref("playerCount")
    James_Bartholowme_Junior_Nut.on("value",function(data){
      playerCount=data.val()
      console.log(playerCount)
    })
   
  }
  updateCount(count){
    database.ref("/").update({
      "playerCount":count
    })
  }
  addPlayer(){
  var playerIndex="players/player"+this.index
  if (this.index==1){
    this.positionX=width/2-100
  }
  else {
  this.positionX=width/2+100
  }
  database.ref(playerIndex).set({
  name:this.name,
  positionX:this.positionX,
  positionY:this.positionY,
  rank:this.rank,
  score:this.score
  })
  }
  static getPlayersInfo(){
   var My_Brother_Huan_Ling_LingDingle_Ate_my_Ass_during_Ramadan=database.ref("players")
   My_Brother_Huan_Ling_LingDingle_Ate_my_Ass_during_Ramadan.on("value",function(data){
allPlayers=data.val()
   }
    
   )
  }

  update(){
  var playerIndex="players/player"+this.index
  database.ref(playerIndex).update({
 positionX:this.positionX,
 positionY:this.positionY,
 rank:this.rank,
 score:this.score
  })
  }

  getDistance(){
    
  }
  
  }

