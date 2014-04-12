function Triangle(position, color) {
  this.x = position.x;
  this.y = position.y;
  this.color = color;
}

Triangle.prototype.updateColor = function (color) {
  this.color = color;
};

Triangle.prototype.serialize = function () {
  return {
    position: {
      x: this.x,
      y: this.y
    },
    color: this.color
  };
};