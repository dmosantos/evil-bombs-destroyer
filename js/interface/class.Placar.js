function Placar() {
	Element.call(this);

	this.type = 'Placar';
	this.id = this.type;
	this.layer = 12;
}

Placar.prototype = new Element();

Placar.prototype.update = function() {
	this.x = 15;
	this.y = height;
	this.width = width;
	this.height = height;
}

Placar.prototype.draw = function() {
    fill($.config.baseColor);
    noStroke();

    textAlign(LEFT, CENTER);

    textSize(18);
    textStyle(BOLD);
    text('Score: ' + $.states.points, this.x, 25);
}