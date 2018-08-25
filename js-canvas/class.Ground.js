function Ground() {
	Element.call(this);

	this.type = 'Ground';
	this.id = this.type;
}

Ground.prototype = new Element();

Ground.prototype.update = function() {
	this.y = windowHeight - 48;
	this.width = windowWidth;
	this.height = windowHeight - this.y;
}

Ground.prototype.draw = function() {
    fill(255);
    noStroke();

    rect(this.x, this.y, this.width, this.height);
}