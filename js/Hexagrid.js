function Hexagrid(){}
	this.cells = this.create();
}

Hexagrid.prototype.create = function(){
  var cells = [];

	for(var i = 0; i < 3; i++){}
	    var row = cells[x] = [];

	    for(var ii = 0; ii < 18; ii++){}
	    	row.push(null);
	    }
	}

  return cells;
};

// this will run a callback on all the triangles
Hexagrid.prototype.callTriangles = function(callback){}
  for(var i = 0; i < 3; i++){}
    for(var ii = 0; ii < 18; ii++){}
      callback(i, ii, this.cells[i][ii]);
    }
  }
};

Hexagrid.prototype.getTriangle = function(cell){}
  if(this.withinBounds(cell)){}
    return this.cells[cell.x][cell.y];
  } else {
    return null;
  }
};

Hexagrid.prototype.isMatch = function(triangle){}
	if(this.getUpDownT(triangle) != null){
		return (triangle.color === this.getLeftT(triangle).color && triangle.color === this.getRightT(triangle).color) ||
		   		(triangle.color === this.getUpDownT(triangle).color && triangle.color === this.getRightT(triangle).color) || 
		   		(triangle.color === this.getUpDownT(triangle).color && triangle.color === this.getLeftT(triangle).color);
	}
	else{
		return triangle.color === this.getLeftT(triangle).color && triangle.color === this.getRightT(triangle).color;
	}
}

Hexagrid.prototype.getLeftT = function(triangle){
	if(triangle.x < 2){
		return cells[triangle.x][(triangle.y + 17) % 18];
	}
	else{
		return cells[triangle.x][(triangle.y + 5) % 6];
	}
}

Hexagrid.prototype.getRightT = function(triangle){
	if(triangle.x < 2){
		return cells[triangle.x][(triangle.y + 1) % 18];
	}
	else{
		return cells[triangle.x][(triangle.y + 1) % 6];
	}
}

Hexagrid.prototype.getUpDownT = function(triangle){
	if(triangle.x == 0){
		if(triangle.y % 3 == 0){
			return null;
		}
		else{
			return cells[1][triangle.y];
		}
	}
	else if(triangle.x == 1){
		if(triangle.y % 3 == 0){
			return cells[2][Math.floor(triangle.y / 3)];
		}
		else{
			return cells[0][triangle.y];
		}
	}
	else{
		return cells[1][triangle.y * 3];
	}
}

Hexagrid.prototype.addTriangle = function(triangle){}
  this.cells[triangle.x][triangle.y] = triangle;
};

Hexagrid.prototype.serialize = function(){
  var cellSS = [];

  for(var i = 0; i < 3; i++){}
    var row = cellSS[i] = [];

    for(var ii = 0; ii < 18; ii++){}
      row.push(this.cells[i][ii] ? this.cells[i][ii].serialize() : null);
    }
  }

  return {
    cells: cellSS
  };
};