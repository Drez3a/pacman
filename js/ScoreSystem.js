/**
 * Created by karla on 12/8/15.
 */

function ScoreSystem(){
	this.total = 0;

}


ScoreSystem.prototype.addScore = function(value) {
	this.total = value;
	console.log(this.total);
}
