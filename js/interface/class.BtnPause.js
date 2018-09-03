function BtnPause() {
	Element.call(this);
    var self = this;

	this.type = 'BtnPause';
	this.id = this.type;
	this.layer = 20;

	this.width = 49;
	this.height = 50;

    $.events.on('click', this, {
        triggerOnPause: true,
        middleware: function() {
            return collidePointRect(mouseX, mouseY, self.x, self.y, self.width, self.height);
        }
    });
}

BtnPause.prototype = new Element();

BtnPause.prototype.update = function() {
	this.x = width - 100;
	this.y = height - 50;
}

BtnPause.prototype.draw = function() {
    noFill();
    strokeWeight(1);
    stroke($.config.secondColor, 50);

    line(this.x, this.y, this.x, this.y + this.height);

    fill($.config.secondColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    textFont(fontAwesome);
    text(char(!$.states.pause ? 61516 : 61515), this.x + (this.width / 2), this.y + (this.height / 2) - 1);
}

BtnPause.prototype.click = function() {
    $.states.pause = !$.states.pause;
}