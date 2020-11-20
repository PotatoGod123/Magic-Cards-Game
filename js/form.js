'use strict';
var userNameElement = document.getElementById('user-name-form');
var userInputRender = document.getElementById('input-render');
var imageElement = document.getElementById('character-picture');

var playerInfo = [];
//to be used later
function Player(name,race){
  this.name = name;
  this.race=race;
  playerInfo.push(this);
}

function playerInput(e){
  e.preventDefault();

  getInputandRender(e);
  //   console.log(player, race);

}

userNameElement.addEventListener('submit',playerInput);

document.forms[0].onsubmit= function(e){
  formCanceler(e);

};

function getInputandRender(e){
  var player= e.target.username.value;
  var race = e.target.race.value;
  new Player(player,race);
  userInputRender.textContent=`${playerInfo[0].name} are you ready to battle? Hit START GAME Above!`;
  if(playerInfo[0].race === 'human'){
    imageElement.src= './img/humanfive.png';
  }
  else{
    imageElement.src= './img/monstertwo.png';
  }
  putPlayersToLocalStorage();
}

function formCanceler(e){
  e.target.style.display='none';
}

function putPlayersToLocalStorage(){
  var stringfiedPlayers = JSON.stringify(playerInfo);
  localStorage.setItem('userInfo',stringfiedPlayers);
  //console.log(stringfiedPlayers);
}

function getPlayersOutOfLocalStorage(){
  playerInfo= [];
  var playersFromLocalStorage = localStorage.getItem('userInfo');
  var parsedPlayers = JSON.parse(playersFromLocalStorage);
  //console.log(parsedPlayers);
  generateNewPlayer(parsedPlayers);
}

function generateNewPlayer(userInfo){

  for (var i=0; i<userInfo.length; i++){
    new Player(userInfo[i].name,userInfo[i].race);
  }
}
function callThisToCheckLocalStorage(){
  if(localStorage.key('userInfo').length ===0){
  // hello
  } else {
    var userFormElement = document.getElementById('user-name-input');
    userFormElement.style.display = 'none';
    getPlayersOutOfLocalStorage();
    userInputRender.textContent=`${playerInfo[0].name} are you ready to battle? `;
    if(playerInfo[0].race === 'human'){
      imageElement.src= './img/human.jpg';
    }
    else{
      imageElement.src= './img/monster.jpg';
    }
  }
}

callThisToCheckLocalStorage();
