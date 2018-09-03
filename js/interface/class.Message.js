function Message(text) {
	Element.call(this);

	this.type = 'Message';
	this.id = this.type + '_' + newId();
	this.layer = 50;

	this.height = 50;

	this.text = text;
	this.start = $.states.frames.count;

	this.animation = (new Animation(this, {
		duration: 2000,
		ease: 'linear',
		keyframes: {
			0: {
				alpha: 0,
				percSize: 3,
				percY: 1
			},
			10: {
				alpha: 200,
				percSize: 1,
				percY: 1
			},
			90: {
				alpha: 200,
				percSize: 1,
				percY: 1.3
			},
			100: {
				alpha: 0,
				percSize: 1,
				percY: 1.4
			}
		}
	})).start();
}

Message.prototype = new Element();

Message.prototype.update = function() {
	this.x = width / 2;
	this.y = height / 2;
	this.width = width;

	if($.states.frames.count - this.start > 130)
		this.dead = true;
}

Message.prototype.draw = function() {
    fill($.config.secondColor, this.animation.get('alpha'));
    noStroke();

    textAlign(CENTER, CENTER);

    textSize(18  * this.animation.get('percSize'));
    textStyle(BOLD);
    text(this.text, this.x, height - (this.y * this.animation.get('percY')));
}