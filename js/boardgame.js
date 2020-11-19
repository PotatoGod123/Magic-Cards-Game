'use strict';
//Global Variable
var humanCardsSet = [];
var monsterCardsSet = [];
var twoRandomNumBetweenCardSetLength = [];
var playerCurrentCardHand= document.getElementById('playerHand');
//This constructor will form an object instance of a card and push into it's appropiate type race 
//array above
var CardMaster = function(name,filepath,attack,health,race){
  this.name = name;
  this.filepath = `./img/${name}.${filepath}`;
  this.attack = attack;
  this.health = health;
  this.race = race;
  //this is where it check the type when make a new card and shoves into the array for it
  if(this.race==='Human'){
    humanCardsSet.push(this);
  }
  if(this.race==='Monster'){
    monsterCardsSet.push(this);
  }

};

//here are all the new cards being made
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

// this small constructor will make the players and give them the selected race they choose from in the
//home page, the ai will always get the oppisite deck or can set to whatever deck set, look at function bellow
var PlayerMaster = function(playerName='Player',healthpoints,selectedRace='human'){
  this.playerName = playerName;
  this.healthpoints= healthpoints;
  this.selectedRace= selectedRace;
  this.playerDeck=[];
};
//these are the players being made
var aiPlayer = new PlayerMaster('Ai',20);
var userPlayer = new PlayerMaster('Player' ,20,'human');

//
function callThisToUpdatePlayersCardSet(){
  if(userPlayer.selectedRace==='human'){
    userPlayer.playerDeck.push(humanCardsSet);
    aiPlayer.playerDeck.push(monsterCardsSet);
  }
  if(userPlayer.selectedRace==='monster'){
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
  playersCardDisplayTwo.title= userPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[1]].name;

  var aiHelathBarDisplay = document.getElementById('aiHealth');
  aiHelathBarDisplay.textContent = aiPlayer.healthpoints;
  var playerHelathBarDisplay = document.getElementById('playerHealth');
  playerHelathBarDisplay.textContent = userPlayer.healthpoints;
  var nameDisplayOne = document.getElementById('aiName');
  var nameDisplayTwo = document.getElementById('playerName');
  nameDisplayOne.textContent = aiPlayer.playerDeck[0][0].race;
  nameDisplayTwo.textContent = userPlayer.playerName;

}


playerCurrentCardHand.addEventListener('click',clickedOnCard);

function clickedOnCard(e){
  var targetCard = e.target.title;
  console.log(targetCard);
  for(var i=0;i<userPlayer.playerDeck[0].length;i++){
    if(targetCard===userPlayer.playerDeck[0][i].name){
      console.log(userPlayer.playerDeck[0][i].name);
      if(userPlayer.playerDeck[0][i].attack<aiPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[1]].health){
        console.log('you lost the battle!!! you lose 4 hp');
        userPlayer.healthpoints-= 4;
        callThisToPutTwoRandomNumbers();
        render();
      }
      if(userPlayer.playerDeck[0][i].attack>=aiPlayer.playerDeck[0][twoRandomNumBetweenCardSetLength[1]].health){
        console.log('Noice you won');
        aiPlayer.healthpoints-= 4;
        callThisToPutTwoRandomNumbers();
        render();
      }
    }
  }
  callThisToShowEndGame();
}

//function to render win or losing screen then remove game from dom and add maybe a reset button
function callThisToShowEndGame(){
  var winningElement = document.getElementById('gameOver');
  var boardSection = document.getElementById('gameState');
  var winningTextSection = document.getElementById('scoreText');
  var winningAudio = document.getElementById('looserAudio');
  if(aiPlayer.healthpoints===0){
    boardSection.remove();
    winningElement.src= './img/winner.png';
    winningTextSection.textContent = `${userPlayer.playerName} you have WON!!!!!!`;
    winningAudio.src= './audio/winner.mp3';
    playerCurrentCardHand.removeEventListener('click');

  }
  if(userPlayer.healthpoints===0){
    boardSection.remove();
    winningElement.src = './img/gameoverscreen.jpg';
    winningTextSection.textContent = `${userPlayer.playerName} you have Lost, :(`;
    winningAudio.src= './audio/looser.mp3';
    playerCurrentCardHand.removeEventListener('click');
  }
}

function pullLocalStorageUserInfo(){
  var userLocalInfo = localStorage.getItem('userInfo');
  var userParsedInfo= JSON.parse(userLocalInfo);
  //console.log(userParsedInfo);
  updatePlayersSelectedRaceFromLocalStorage(userParsedInfo);
}

function updatePlayersSelectedRaceFromLocalStorage(banana){
  for(var i=0;i<banana.length;i++){
    userPlayer.playerName= banana[i].name;
    // console.log(userPlayer.playerName);
    userPlayer.selectedRace= banana[i].race;
    // console.log(userPlayer.selectedRace);
  }
}
function callThisToUpdatePlayersInfoWithLocalStorage(){
  if(localStorage.length===0){
    if(localStorage.key('userInfo')!==true){
      console.log('hello');
      callThisToUpdatePlayersCardSet();
      callThisToPutTwoRandomNumbers();
      render();
    }
  } else{
    pullLocalStorageUserInfo();
    callThisToUpdatePlayersCardSet();
    callThisToPutTwoRandomNumbers();
    render();

  }
 
}
//add a buttom to reset game
function addButtonReset(){
  var sectionHoldingEverything = document.getElementById('sectionHoldingGame');
  var buttonformation = document.createElement('button');

}

//calling functions/expressing them
callThisToUpdatePlayersInfoWithLocalStorage();



