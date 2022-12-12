//circle variables
let xBall = 300;
let yBall = 200;
let diameter = 25;
let radius = diameter / 2;

//circle speed
let speedXBall = 6;
let speedYBall = 6;

//rectangle variables
let xRacket = 20;
let yRacket = 150;
let widthRacket = 10;
let heightRacket = 90;

//opponent variables
let xOpponentRacket = 580;
let yOpponentRacket = 150;
let speedYOpponent;

let collided = false;

//game score
let myScore = 0;
let opponentScore = 0;

//game sounds
let raquetada;
let ponto;

let chanceOfError = 0;

function preload()
{
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() 
{
  createCanvas(600,400);
}

function draw(){
  background(0);
  showBall();
  movementBall();
  verifyEdgeCollision(); 
  showRacket(xRacket, yRacket);
  movementRacket(); 
  //verifyRacketCollision();
  verifyCollisionRacketLibrary(xRacket,yRacket);
  showRacket(xOpponentRacket, yOpponentRacket);
  //movementOpponentRacket();
  movementOpponentRacketMultiplayer();
  verifyCollisionRacketLibrary(xOpponentRacket,yOpponentRacket);
  includeScore();
  scorePoints();
  ballDontGetStuck();
}

function showBall() 
{ 
  circle(xBall, yBall, diameter); 
}

function movementBall()
{
  xBall += speedXBall;
  yBall += speedYBall;
}

function showRacket(x, y)
{
  rect(x, y, widthRacket, heightRacket);
}


function movementRacket()
{
  if(keyIsDown(87))
  {
    yRacket -= 10;
  }
  
  if(keyIsDown(83))
  {
    yRacket += 10;
  }
}

function movementOpponentRacket()
{
  speedYOpponent = yBall -yOpponentRacket - widthRacket / 2 - 30;
  yOpponentRacket += speedYOpponent + chanceOfError;
  calculateChanceOfError();
}

function calculateChanceOfError(){
  if(opponentScore >= myScore)
  {
    chanceOfError += 1
    if(chanceOfError >= 39)
    {
      chanceOfError = 40;
    }
  } else {
    chanceOfError -= 1
    if(chanceOfError <= 35)
    {
      chanceOfError = 35
    }
  }
}

function movementOpponentRacketMultiplayer()
{
  if(keyIsDown(UP_ARROW))
  {
    yOpponentRacket -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW))
  {
    yOpponentRacket += 10;
  }
}
  

function verifyEdgeCollision()
{
  if(xBall + radius > width || xBall - radius < 0)
  {  speedXBall *= -1;
  }
  
  if(yBall + radius> height || yBall - radius< 0)
  {
    speedYBall *= -1;
  }
  
}

function verifyRacketCollision()
{
  if(xBall - radius < xRacket + widthRacket && yBall - radius < yRacket + heightRacket && yBall + radius > yRacket)
  {
    speedXBall *= -1;
    raquetada.play();
  }
}

function verifyCollisionRacketLibrary(x,y)
{
  collided =      collideRectCircle(x,y,widthRacket,heightRacket,xBall,yBall,radius);
  if(collided)
  {
    speedXBall *= -1;
    raquetada.play();
  }
}

function includeScore()
{
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(66, 135, 245))
  rect(150,10,40,20);
  fill(255);
  text(myScore, 170, 26);
  fill(color(245, 78, 66))
  rect(450,10,40,20);
  fill(255);
  text(opponentScore, 470, 26);
}

function scorePoints()
{
  if(xBall > 587){
    myScore +=1;
    ponto.play()
  }
  
  if(xBall < 13){
    opponentScore += 1;
    ponto.play();
  }
}

function ballDontGetStuck()
{
  if(xBall - radius < 0)
  {
    xBall = 23;
  }
  
  if(xBall + radius > 600)
  {
    xBall = 577;
  }
  
}

