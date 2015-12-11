"use strict";


//$PacmanAgent

function PacmanAgent(name, x, y, color, space) {
	Agent.call(this, name, x, y, color, space);
};

PacmanAgent.prototype = Object.create(Agent.prototype);
PacmanAgent.prototype.constructor = PacmanAgent;

PacmanAgent.prototype.draw = function() {

	var toX = String(this.state.x*this.space.scale+this.space.border);
	var toY = String(this.state.y*this.space.scale+this.space.border);

	var rect = document.createElementNS(this.space.svg, 'rect');

	rect.setAttributeNS(null, 'id', this.name);
	rect.setAttributeNS(null, 'height', String(this.space.scale));
	rect.setAttributeNS(null, 'width', String(this.space.scale));
	rect.setAttributeNS(null, 'fill', this.color);
	rect.setAttributeNS(null, 'stroke', '#' + '000');
	rect.setAttributeNS(null, 'stroke-width', '2');
	rect.setAttributeNS(null, 'class',  'agent');

	rect.style.transform = 'translate('+toX+'px, '+toY+'px)';

	document.getElementById('svg-space').appendChild(rect);

	this.element = rect;

	this.stopSpriteAnimation();
};

PacmanAgent.prototype.bindMove = function(onPacmanMove){
	this.on('move', onPacmanMove);
};

//$Meal prototype class
//Agents that have value
function Meal(name, value, x, y, color, space) {
	Agent.call(this, name, x, y, color, space);
	this.value = value || 10;
}

Meal.prototype = Object.create(Agent.prototype);

Meal.prototype.constructor = Meal;

// $AgentCollection
// Set a collection of agents
function AgentCollection(space) {
	Queue.call(this);

	this.space = space || new Space();
}

AgentCollection.prototype.constructor = AgentCollection;

AgentCollection.prototype = Object.create(Queue.prototype);

AgentCollection.prototype.getTotalValue = function() {
	return this.queue.length * this.queue.first().value;
};

AgentCollection.prototype.removeItem = function(x, y) {
	var self = this;
	var point = new Point(x, y);
	this.queue = this.queue.filter(function (item) {
		if (item.state.equalsTo(point)) {
			self.removeDOMElement(item.element);
			return false;
		}
		return true;
	});
}

AgentCollection.prototype.eat = function(item) {
	var item = this.remove(item.x, item.y);
	if (item !== -1) {
		this.removeDOMElement(item.element);
	}
};

AgentCollection.prototype.remove = function(x, y) {
	var index = this.getIndex(x,y);
	return this.queue.splice(index, 1)[0];
};

AgentCollection.prototype.removeDOMElement = function(element){
	this.space.removeDOMElement(element);
};

AgentCollection.prototype.get = function(x, y) {
	var point = new Point(x, y);

	return this.queue.find(function(item){
		return item.state.equalsTo(point);
	}) || false;
};

AgentCollection.prototype.getIndex = function(x, y) {
	var point = new Point(x, y);

	return this.queue.findIndex(function(item){
		return item.state.equalsTo(point);
	});
};

AgentCollection.prototype.isColliding = function(x, y) {
	return this.get(x, y) ? true : false;
};

AgentCollection.prototype.draw = function () {

	for (var i = 0; i < this.queue.length; i++) {
		var object = this.queue[i];
		object.draw();
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

