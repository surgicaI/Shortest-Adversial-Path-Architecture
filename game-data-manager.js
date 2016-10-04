module.exports = new GameDataManager();
var Graph = require('./graph.js');

function GameDataManager() {
  this.graph;
  this.startPoint;
  this.playerOnePosition;
  this.endPoint;
  this.originalData;
  this.playerBill = 0;
}

GameDataManager.prototype.initialize = function (data) {
  this.originalData = data;

  this.graph = new Graph();

  data = data.split('\n');
  var startPoint = data[0].split(' ')[2];
  var endPoint = data[1].split(' ')[2];

  this.startPoint = startPoint;
  this.endPoint = endPoint;
  this.playerOnePosition = this.startPoint;

  data.splice(0, 3);

  var curr;
  for(var i = 0; i < data.length; i++) {
    curr = data[i].split(' ');
    this.graph.addEdge(curr[0], curr[1]);
  }

  GameDataManager.prototype.setPlayerOnePosition = function(y) {
    this.addBill(y);
    this.playerOnePosition = y;

    if (this.endPoint === this.playerOnePosition){
      return true;
    } else {
      return false;
    }
  };

  GameDataManager.prototype.doubleEdgeCost = function (x, y) {
    this.graph.doubleCost(x, y);
  };

  GameDataManager.prototype.addBill = function(y) {
    this.playerBill += this.graph.getEdgeCost(this.playerOnePosition, y);
  };

  GameDataManager.prototype.reset = function () {
    this.playerOnePosition = this.startPoint;
    this.playerBill = 0;
  };

  GameDataManager.prototype.validateMove = function (x, y) {
    if (!y) {
      y = x;
      x = this.playerOnePosition;
    }
    return this.graph.validEdge(x, y);
  };
}
