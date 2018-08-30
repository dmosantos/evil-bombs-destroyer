function PlayerBullet() {
	Element.call(this);

	this.type = 'PlayerBullet';
	this.id = this.type + '_' + newId();
	this.layer = 4;

	this.direction = $.elements.Player.direction;
	this.x = $.elements.Player.x + (cos(this.direction) * 45);
	this.y = $.elements.Player.y - 5 + (sin(this.direction) * 45);
	this.diameter = 10;
	this.speed = 10;
}

PlayerBullet.prototype = new Element();

PlayerBullet.prototype.update = function() {
	//if(this.x + (this.diameter / 2) < 0 || this.x - (this.diameter / 2) > windowWidth || this.y + (this.diameter / 2) < 0 || this.y - (this.diameter / 2) > windowHeight) 
	if(this.y + (this.diameter / 2) < 0 || this.y - (this.diameter / 2) > windowHeight) 
		this._die();

	if(this.x - (this.diameter / 2) < 0) {
		this.direction = this.direction - 1 + ((270 - this.direction) * 2);
	}

	if(this.x + (this.diameter / 2) > windowWidth)
		this.direction = this.direction + 1 - ((this.direction - 270) * 2);
}

PlayerBullet.prototype.draw = function() {
    fill($.config.baseColor);
    stroke(0);
    noStroke();

    ellipse(this.x, this.y, this.diameter, this.diameter);
}