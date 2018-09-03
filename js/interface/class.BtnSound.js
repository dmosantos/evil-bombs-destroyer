function BtnSound() {
	Element.call(this);
    var self = this;

	this.type = 'BtnSound';
	this.id = this.type;
	this.layer = 20;

	this.width = 49;
	this.height = 50;

	this.mute = $.data.get('mute');

    $.events.on('click', this, {
        triggerOnPause: true,
        middleware: function() {
            return collidePointRect(mouseX, mouseY, self.x, self.y, self.width, self.height);
        }
    });
}

BtnSound.prototype = new Element();

BtnSound.prototype.update = function() {
	this.x = width - 50;
	this.y = height - 50;
}

BtnSound.prototype.draw = function() {
    noFill();
    strokeWeight(1);
    stroke($.config.secondColor, 50);

    line(this.x, this.y, this.x, this.y + this.height);

    fill($.config.secondColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    textFont(fontAwesome);
    text(char(61480), this.x + (this.width / 2), this.y + (this.height / 2) - 1);

    if(this.mute) {
        noFill();
    	stroke($.config.secondColor);
    	strokeWeight(3);
        translate(this.x + (this.width / 2), this.y + (this.height / 2));
        rotate(-45);
    	line(-((this.width * 0.6) / 2) + 2, 0, ((this.width * 0.6) / 2) - 2, 0);
        ellipse(0, 0, this.width * 0.6, this.height * 0.6);
    }
}

BtnSound.prototype.click = function() {
	this.mute = !this.mute;

	$.data.set('mute', this.mute);

	if(this.mute)
		mute();
	else
		unmute();
}