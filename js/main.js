"use strict";

//#gameAgents module
var gameAgents = {};

var space;

function startSpace() {

	if (gameAgents && Space) {

		space = new Space('http://www.w3.org/2000/svg', 15, new Point(28, 31), 0, 'transparent', maze0Data);

		space.draw();

		space.bindClickEvent();
		space.bindKeyEvents();
		space.drawWalls();

		// init ScoreSystem

		gameAgents.scoreSystem = new ScoreSystem();

		//pacmanAgent
		gameAgents.pacmanAgent = new PacmanAgent('pacman', 13, 17, 'url(#pacman-pattern)', space);
		gameAgents.pacmanAgent.draw();

		//Event, binds pacman's movement
		gameAgents.pacmanAgent.bindMove(function onPacmanMove(e){
			window.setTimeout(function(){
				var pacDotsEaten = gameAgents.pacDots.removeItem(e.detail.state.x, e.detail.state.y);
				if (pacDotsEaten !== -1) {
					gameAgents.pacDotsEaten.insert(pacDotsEaten);
				}
				//powerPallets
				var powerPalletsEaten = gameAgents.powerPallets.removeItem(e.detail.state.x, e.detail.state.y);
				if (powerPalletsEaten !== -1) {
					gameAgents.powerPalletsEaten.insert(powerPalletsEaten);
				}

				gameAgents.scoreSystem.addScore(gameAgents.pacDotsEaten.getTotalValue()+gameAgents.powerPalletsEaten.getTotalValue());
			}, 200);
		});

		// Add Pacdots
		gameAgents.pacDots = new AgentCollection(space);

		gameAgents.pacDotsEaten = new AgentCollection(space);

		// Insert pacdots in the maze
		if (pacDotsData) {
			for (var i=0; i < pacDotsData.length; i++) {
				var x = pacDotsData[i].x;
				var y = pacDotsData[i].y;
				var pacdot = new Meal('pac-dot', 10, x, y, 'url(#pacdot-pattern)', space);
				gameAgents.pacDots.insert(pacdot);
				pacdot.draw();
			}
		}

		// Add PowerPellet
		gameAgents.powerPallets = new AgentCollection(space);

		gameAgents.powerPalletsEaten = new AgentCollection(space);

		// Insert powerpellets in the maze
		if (powerPelletsData) {
			for (var i=0; i < powerPelletsData.length; i++) {
				var x = powerPelletsData[i].x;
				var y = powerPelletsData[i].y;
				var powerpellet = new Meal('power-pellet', 50, x, y, 'url(#powerpellet-pattern)', space);
				gameAgents.powerPallets.insert(powerpellet);
				powerpellet.draw();
			}
		}
	}


	return space;
}

Space.prototype.bindKeyEvents = function() {
	var space = this;
	var gameOn = false;
	var interval;
	var keyPressed = null;
	var keyCode;
	var keyAction;
	var previousAction;
	var nextAction;
	var KEY_ACTIONS = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
	};

	//Register the keydown event handler For pacman's movements
	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);

	function onKeyDown (e) {
		var evt = e ? e : event;
		keyCode = evt.keyCode;

		if (KEY_ACTIONS[keyCode] && (!keyPressed || keyPressed !== keyCode) && gameAgents.pacmanAgent) {
			evt.preventDefault();
			keyAction = KEY_ACTIONS[keyCode];
			nextAction = ACTIONS[keyAction];

			if (!gameOn) {
				gameOn = true;

				var move = function () {
//						console.log(keyAction);
					var nextState = gameAgents.pacmanAgent.state.add(nextAction.state);

					var path = space.moveFromTo(gameAgents.pacmanAgent.element, gameAgents.pacmanAgent.state, nextState);

					if (path.length > 0) {
						previousAction = nextAction;
					} else if (previousAction) {

						nextState = gameAgents.pacmanAgent.state.add(previousAction.state);

						path = space.moveFromTo(gameAgents.pacmanAgent.element, gameAgents.pacmanAgent.state, nextState);
					}

					if (gameAgents.pacmanAgent.element && path.length > 0) {

						for (var i = 0; i < path.length-1; i++) {
							var node = path[i];
							var toX = String(nextState.x*space.scale+space.border);
							var toY = String(nextState.y*space.scale+space.border);

							gameAgents.pacmanAgent.element.style.transform = 'translate('+toX+'px, '+toY+'px)';

							gameAgents.pacmanAgent.animateSprite(node.action);

							gameAgents.pacmanAgent.state = nextState;


						}
						gameAgents.pacmanAgent.broadcast('move', gameAgents.pacmanAgent);

						interval = window.setTimeout(move, 200);
						return true;
					} else {
						gameOn = false;
						gameAgents.pacmanAgent.stopSpriteAnimation();
						return false;
					}
				};

				move();
			}

			keyPressed = keyCode;

			return false;
		}

		return true;

	};


	function onKeyUp (e) {
		var evt = e ? e : event;
		evt.preventDefault();
		keyPressed = null;
	};
};
