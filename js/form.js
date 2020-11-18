'use strict';
var userNameElement = document.getElementById('user-name-form');
var userInputRender = document.getElementById('input-render');
var imageElement = document.getElementById('character-picture');

 var playerName = [];

function Player(name){
    this.name = name;

    playerName.push(this);
}

function playerInput(e){
    e.preventDefault();
    
    var player= e.target.username.value;
    var race = e.target.race.value;
    
    userInputRender.textContent=`${player} are you ready to battle? `;
    if(race === 'human'){
    imageElement.src= './img/human.jpg'
    }
    else{
        imageElement.src= './img/monster.jpg'
    }
    console.log(player, race);
    playerName.push(player);
    putPlayersToLocalStorage();
    
}

userNameElement.addEventListener('submit',playerInput);

document.forms[0].onsubmit= function(e){
    formCanceler(e);

}

function formCanceler(e){
    e.target.style.display='none';
}

function putPlayersToLocalStorage(){
    var stringfiedPlayers = JSON.stringify(playerName);
    localStorage.setItem('names',stringfiedPlayers);
    console.log(stringfiedPlayers);
}

function getPlayersOutOfLocalStorage(){
    var playersFromLocalStorage = localStorage.getItem('names');
    var parsedPlayers = JSON.parse(playersFromLocalStorage);
    console.log(parsedPlayers);
    generateNewPlayer(parsedPlayers);
}

function generateNewPlayer(names){
    playerName = [];
    for (var i=0; i<names.length; i++){
        new Player(names[i].name);
    }
}


