function Placar() {
	Element.call(this);

	this.type = 'Placar';
	this.id = this.type;
	this.layer = 10;
}

Placar.prototype = new Element();

Placar.prototype.update = function() {
	this.x = 15;
	this.y = windowHeight;
	this.width = windowWidth;
	this.height = windowHeight;
}

Placar.prototype.draw = function() {
    fill(0);
    noStroke();

    textAlign(LEFT, CENTER);

    textSize(18);
    textStyle(BOLD);
    text('Pontuação: ' + $.states.points, this.x, this.y - 25);
}