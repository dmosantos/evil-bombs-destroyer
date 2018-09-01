function BtnSound() {
	Element.call(this);
    var self = this;

	this.type = 'BtnSound';
	this.id = this.type;
	this.layer = 20;

	this.width = 30;
	this.height = 30;

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
	this.x = width - 40;
	this.y = height - 40;
}

BtnSound.prototype.draw = function() {
    noFill();
    strokeWeight(2);
    stroke($.config.secondColor);

    rect(this.x, this.y, this.width, this.height, 4);

    fill($.config.secondColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    //textFont(fontAwesome);
    //text(char(61480), this.x + (this.width / 2), this.y + (this.height / 2) - 1);
    text('S', this.x + (this.width / 2), this.y + (this.height / 2) - 1);

    if(this.mute) {
    	stroke($.config.secondColor);
    	strokeWeight(2);
    	line(this.x + 2, this.y + this.height - 2, this.x + this.width - 2, this.y + 2);
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