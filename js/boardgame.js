'use strict';
//Global Variable
var humanCardsSet = [];
var monsterCardsSet = [];
var twoRandomNumBetweenCardSetLength =[];
var allBoardElement=document.getElementById('gameState');

var CardMaster = function(name,filepath,attack,health,race){
  this.name = name;
  this.filepath = `./img/${name}.${filepath}`;
  this.attack = attack;
  this.health = health;
  this.race = race;

  if(this.race==='Human'){
    humanCardsSet.push(this);
  }
  if(this.race==='Monster'){
    monsterCardsSet.push(this);
  }

};


new CardMaster('humanone','png',20,15,'Human');
new CardMaster('humantwo','png',5,6,'Human');
new CardMaster('humanthree','png',1,20,'Human');
new CardMaster('humanfour','png',5,5,'Human');
new CardMaster('humanfive','png',17,3,'Human');
new CardMaster('monsterone','png',51,20,'Monster');
new CardMaster('monstertwo','png',20,10,'Monster');
new CardMaster('monsterthree','png',10,5,'Monster');
new CardMaster('monsterfour','png',3,1,'Monster');
new CardMaster('monsterfive','png',0,13,'Monster');


var PlayerMaster = function(playerName,healthpoints,selectedRace='Human'){
  this.playerName = playerName;
  this.healthpoints= healthpoints;
  this.selectedRace= selectedRace;
  this.playerDeck=[];
};

var aiPlayer = new PlayerMaster('Ai',15);
var userPlayer = new PlayerMaster('Player',15,'Monster');


function callThisToUpdatePlayersCardSet(){
  if(userPlayer.selectedRace==='Human'){
    userPlayer.playerDeck.push(humanCardsSet);
    aiPlayer.playerDeck.push(monsterCardsSet);
  }
  if(userPlayer.selectedRace==='Monster'){
    userPlayer.playerDeck.push(monsterCardsSet);
    aiPlayer.playerDeck.push(humanCardsSet);
  }
}

function callThisToPutTwoRandomNumbers(){
  for(var i=0;i<2;i++){
    var randomNum= randomNumberHelperFunction();

    while(twoRandomNumBetweenCardSetLength.includes(randomNum)){
      randomNum=randomNumberHelperFunction();
    }
    twoRandomNumBetweenCardSetLength.unshift(randomNum);
    while(twoRandomNumBetweenCardSetLength.length>2){
      twoRandomNumBetweenCardSetLength.pop();
    }

  }
}

function randomNumberHelperFunction(){
  return Math.floor(Math.random()*aiPlayer.playerDeck[0].length);
}

function render(){
  var aiHandDisplayCardOne = document.getElementById('aiHandCardOne');
  aiHandDisplayCardOne.src= '';
  aiHandDisplayCardOne.title= '';
  aiHandDisplayCardOne.src = aiPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[0]].filepath;
  aiHandDisplayCardOne.title = aiPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[0]].name;
  //
  var aiPickedCardDisplay = document.getElementById('aiPickedCard');
  aiPickedCardDisplay.src= '';
  aiPickedCardDisplay.title= '';
  aiPickedCardDisplay.src= aiPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[1]].filepath;
  aiPickedCardDisplay.title= aiPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[1]].name;
  //
  var playersCardDisplayOne = document.getElementById('playerHandCardOne');
  var playersCardDisplayTwo= document.getElementById('playerHandCardTwo');
  playersCardDisplayOne.src='';
  playersCardDisplayTwo.src= '';
  playersCardDisplayOne.title='';
  playersCardDisplayTwo.title= '';
  playersCardDisplayOne.src= userPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[0]].filepath;
  playersCardDisplayTwo.src= userPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[1]].filepath;
  playersCardDisplayOne.title= userPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[0]].name;
  playersCardDisplayOne.title= userPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[1]].name;



}







//calling functions/expressing them
callThisToUpdatePlayersCardSet();
callThisToPutTwoRandomNumbers();
render();

