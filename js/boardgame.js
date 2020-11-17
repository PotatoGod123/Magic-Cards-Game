'use strict';
//Global Variable
var humanCardsSet = [];
var monsterCardsSet = [];


var CardMaster = function(name,filepath,attack,health,race){
  this.name = name;
  this.filepath = filepath;
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
