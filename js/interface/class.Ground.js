function Ground() {
	Element.call(this);

	this.type = 'Ground';
	this.id = this.type;
	this.layer = 11;
}

Ground.prototype = new Element();

Ground.prototype.update = function() {
	this.y = height - 50;
	this.width = width;
	this.height = height - this.y;
}

Ground.prototype.draw = function() {
    fill($.config.baseColor);
    noStroke();

    rect(this.x, this.y, this.width, this.height);
}