//Create variables here
var dog,dogImg;
var happyDogImg;
var foodS;
var foodStock;
var database;
var feed,addFood;
var lastFed=0;
var foodObj;
var bedroom, washroom, garden;
var gameState;

function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");
  happyDogImg=loadImage("happydog.png");

  bedroom=loadImage("Bed Room.png"); 
  washroom=loadImage("Wash Room.png"); 
  garden=loadImage("Garden.png"); 

  readState=database.ref('gameState');
  readState.on("value",function(data){
  gameState=data.val();
  })

}

function setup() {
  database= firebase.database();
  createCanvas(500, 500);

    dog = createSprite(250,300,150,150);
    dog.addImage(dogImg);
    dog.scale=0.150;

    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
      lastFed=data.val();
    })
   
    feed=createButton("Feed the Dog");
    feed.position(600,65);
    feed.mousePressed(feedDog);

    addFood=createButton("Add Food");
    addFood.position(700,65);
    addFood.mousePressed(addFoods);

    foodObj=new Foods(250,250,width,height);
  
}


function draw() {  
  background(46,136,87);

  fill(255,255,254);
  textSize(15);
  currentTime=hour();
        if(currentTime==(lastFed+1)){
            update("Playing");
            foodObj.garden();
        }else if(currentTime==(lastFed+2)){
            update("Sleeping");
            foodObj.bedroom();
        }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
            update("Bathing");
            foodObj.washroom();
        }else{
          update("Hungry");
          foodObj.display();
        }

        if(gameState!="Hungry"){
          feed.hide();
          addFood.hide();
          dog.remove();
        }else{
          feed.show();
          addFood.show();
        }
        
drawSprites();
}



function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}