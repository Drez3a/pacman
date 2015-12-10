"use strict";

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

		if (KEY_ACTIONS[keyCode] && (!keyPressed || keyPressed !== keyCode) && pacmanAgent) {
			evt.preventDefault();
			keyAction = KEY_ACTIONS[keyCode];
			nextAction = ACTIONS[keyAction];

			if (!gameOn) {
				gameOn = true;

				var move = function () {
//						console.log(keyAction);
					var nextState = pacmanAgent.state.add(nextAction.state);

					var path = space.moveFromTo(pacmanAgent.element, pacmanAgent.state, nextState);

					if (path.length > 0) {
						previousAction = nextAction;
					} else if (previousAction) {

						nextState = pacmanAgent.state.add(previousAction.state);

						path = space.moveFromTo(pacmanAgent.element, pacmanAgent.state, nextState);
					}

					if (pacmanAgent.element && path.length > 0) {

						for (var i = 0; i < path.length-1; i++) {
							var node = path[i];
							var toX = String(nextState.x*space.scale+space.border);
							var toY = String(nextState.y*space.scale+space.border);

							pacmanAgent.element.style.transform = 'translate('+toX+'px, '+toY+'px)';

							pacmanAgent.animateSprite(node.action);

						}

						pacmanAgent.state = nextState;

						window.setTimeout(move, 250);
						return true;
					} else {
						gameOn = false;
						pacmanAgent.stopSpriteAnimation();
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
		keyPressed = null;
	};
};