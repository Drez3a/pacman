angular.module('Pacman').controller('pacBoardController',
['$scope', function($scope){
  $scope.dimensions;
  $scope.wallSize;
  $scope.bgColor;
  $scope.wallColor;
  $scope.walls;
  $scope.boardRects = [];
  $scope.dimensions = {x: 20, y:20};
  $scope.wallSize ={x:15,y:15};
  $scope.bgColor='#000';
  $scope.wallColor='#a22';

  $scope.initBoard = function(){
    console.log('dentro do initBoard');
    var height = $scope.wallSize.y;
    var width = $scope.wallSize.x;
    for(var i=0; i< $scope.dimensions.x; i++){
      for(var j=0; j<$scope.dimensions.y; j++){
       $scope.boardRects.push({id: _createId('piri',i,j),'x':i,'y':j,'height':height,'width':width,'fill':'rgba(250,226,76,.6)','stroke':'#000','class':'bg' })
      }
    }
    return $scope.boardRects;
  }

var _createId = function(prefix, x, y){
	var id = prefix || '';
	if (x !== undefined && y !== undefined) {
		id = prefix + '-' + x + '-'+ y;
	}

	return id;
};

$scope.initBoard();

}]);
