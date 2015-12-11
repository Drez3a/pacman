"use strict";


//$PacmanAgent

function PacmanAgent(name, value, x, y, color, space) {
	Agent.call(this, name, x, y, color, space);
	this.value = value;
};

PacmanAgent.prototype = Object.create(Agent.prototype);
PacmanAgent.prototype.constructor = PacmanAgent;

PacmanAgent.prototype.draw = function(cssClass) {

	var toX = String(this.state.x*this.space.scale+this.space.border);
	var toY = String(this.state.y*this.space.scale+this.space.border);

	var rect = document.createElementNS(this.space.svg, 'rect');

	rect.setAttributeNS(null, 'id', this.name);
	rect.setAttributeNS(null, 'height', String(this.space.scale));
	rect.setAttributeNS(null, 'width', String(this.space.scale));
	rect.setAttributeNS(null, 'fill', this.color);
	rect.setAttributeNS(null, 'stroke', '#' + '000');
	rect.setAttributeNS(null, 'stroke-width', '2');
	rect.setAttributeNS(null, 'class',  cssClass || 'agent');

	rect.style.transform = 'translate('+toX+'px, '+toY+'px)';

	document.getElementById('svg-space').appendChild(rect);

	this.element = rect;

	this.stopSpriteAnimation();
};

PacmanAgent.prototype.bindMove = function(onMove) {
	this.on('move', onMove);
};

PacmanAgent.prototype.move = function(path) {

	if (this.element && path.length > 0) {

		for (var i = 0; i < path.length-1; i++) {
			var node = path[i];
			this.element.setAttributeNS(null, 'x', String(node.state.x*space.scale+space.border));
			this.element.setAttributeNS(null, 'y', String(node.state.y*space.scale+space.border));

			this.animateSprite(node.action);

			this.state = node.state;

			this.broadcast('move', this);
		}

	} else {
		this.stopSpriteAnimation();
	}


	return this.state;
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
	if (!this.isEmpty()) {
		return this.queue.length * this.head().value;
	}
	return 0;
};

AgentCollection.prototype.removeItem = function(x, y) {
	var self = this;
	var point = new Point(x, y);
	var auxItem = -1;
	this.queue = this.queue.filter(function (item) {
		if (item.state.equalsTo(point)) {
			auxItem = item;
			self.removeDOMElement(item.element);
			return false;
		}
		return true;
	});
	return auxItem;
}

AgentCollection.prototype.eat = function(x, y) {
	var item = this.remove(x, y);
	if (item !== -1) {
		this.removeDOMElement(item.element);
		return item;
	}
	return -1;
};

AgentCollection.prototype.remove = function(x, y) {
	var index = this.getIndex(x,y);
	if (index !== -1){
		return this.queue.splice(index, 1)[0];
	}
	return -1;
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

AgentCollection.prototype.size = function () {

	return this.queue.length;
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
