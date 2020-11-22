var dog,happyDog;
var dogImg,happyDogimg;
var foodS,foodStock;
var database;

function preload()
{
dogImg = loadImage("images/Dog.png");
happyDog = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = image(dogImg,100,200);
  
}


function draw() {  
  background(46,139,87);
  drawSprites();
  //add styles here

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  textSize(20);
  fill("red");
  stroke(2);
  text("Food Stock : " + foodS,250,100);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0
  }else{
     x = x-1;
  }

  database.ref('/').update({
    Food:x  
  });
}



