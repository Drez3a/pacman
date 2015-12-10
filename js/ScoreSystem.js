/**
 * Created by karla on 12/8/15.
 */

function ScoreSystem(){
	this.total = 0;
	this.pacDots = [];
	this.powerPallets = [];
	this.vulnerableGhosts = [];

}

ScoreSystem.prototype.count = function (agents) {
	for (var agent in agents) {
		if (agent.isColliding()) {
			//Handle (Call) function that count value for each agentCollection
		}
	}
};
