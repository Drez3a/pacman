"use strict";

var gameAgents = gameAgents || {};

gameAgents = {
	pacDots : new PacDotCollection,
	powerPellets : 50,
	ghosts : 200, //Double value
	fruits: 300
};


//Agents

//Pac-Dot - 10 points. [TODO]
//

function Meal(name, value, state, color) {
	Agent.call(this, name, state, color);
	this.value = value || 10;
}

Meal.prototype = Object.create(Agent.prototype);
Meal.prototype.constructor = Meal;

Meal.prototype.isColliding = function(state) {
	return this.state.equalsTo(state);
};


function PacDotCollection() {
	Queue.call(this);
	this.eaten = [];
}

PacDotCollection.prototype.constructor = PacDotCollection;

PacDotCollection.prototype = Object.create(Queue.prototype);

PacDotCollection.prototype.getScore = function() {
	return this.eaten.reduce(function(prev, next){
		return prev.value+next.value;
	})
};

PacDotCollection.prototype.get = function(x, y) {
	var point = new Point(x, y);

	return this.queue.find(function(state){
		return state.equalsTo(point);
	}) || false;

};

PacDotCollection.prototype.draw = function (space) {

	for (var x = 0; x < space.dim.x; x ++) {
		for (var y = 0; y < space.dim.y; y ++) {
			if (!space.isWall) {
				var pacdot = new Meal('pac-dot', 10, new Point(x, y), '#fff');
				pacdot.drawInSpace(space);
				this.insert(pacdot);
			}
		}
	}
};



//Power Pellet - 50 points. [TODO]
//
//Vulnerable Ghosts:
//
//#1 in succession - 200 points. [TODO]
//#2 in succession - 400 points. [TODO]
//#3 in succession - 800 points. [TODO]
//#4 in succession - 1600 points. [TODO]
//Fruit:
//	Cherry: 100 points. [TODO]
//Strawberry: 300 points [TODO]
//Orange: 500 points [TODO]
//Apple: 700 points [TODO]
//Melon: 1000 points [TODO]
//Galxian Boss: 2000 points [TODO]
//Bell: 3000 points [TODO]
//Key: 5000 points [TODO]


//$PacmanAgent

function PacmanAgent(a,b,c) {
	Agent.call(this, a,b,c);
};

PacmanAgent.prototype = Object.create(Agent.prototype);
PacmanAgent.prototype.constructor = PacmanAgent;

PacmanAgent.prototype.drawInSpace = function(space) {

	var toX = String(this.state.x*space.scale+space.border);
	var toY = String(this.state.y*space.scale+space.border);

	var rect = document.createElementNS(space.svg, 'rect');

	rect.setAttributeNS(null, 'id', this.name);
	rect.setAttributeNS(null, 'height', String(space.scale));
	rect.setAttributeNS(null, 'width', String(space.scale));
	rect.setAttributeNS(null, 'fill', this.color);
	rect.setAttributeNS(null, 'stroke', '#' + '000');
	rect.setAttributeNS(null, 'stroke-width', '2');
	rect.setAttributeNS(null, 'class',  'agent');

	rect.style.transform = 'translate('+toX+'px, '+toY+'px)';

	document.getElementById('svg-space').appendChild(rect);

	this.element = rect;

	this.stopSpriteAnimation();
};

PacmanAgent.prototype.drawSymbol = function(space){

	var defs = document.createElementNS(this.svg, 'defs');

	var pattern = document.createElementNS(this.svg, 'pattern');
	pattern.setAttributeNS(null, 'id', 'pacman-patt');
	pattern.setAttributeNS(null, 'patternUnits', 'userSpaceOnUse');
	pattern.setAttributeNS(null, 'height', '20');
	pattern.setAttributeNS(null, 'width', '20');
	defs.appendChild(pattern);

	var image = document.createElementNS(this.svg, 'image');
	image.setAttributeNS(null, 'height', '20');
	image.setAttributeNS(null, 'width', '50');
	image.setAttributeNS(null, 'class', 'left');
	image.setAttribute('xmlns:xlink', 'img/pac-eat-right.svg');

	pattern.appendChild(image);

	document.getElementById('svg-space').appendChild(defs);
};