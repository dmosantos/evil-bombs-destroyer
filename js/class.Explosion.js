function Explosion(parent) {
	Element.call(this);

	this.type = 'Explosion';
	this.id = this.type + '_' + newId();
	this.layer = 20;

	this.x = parent.x;
	this.y = parent.y;
	this.diameter = 150;

	this.animation = (new Animation(this, {
		duration: 500,
		//liveUpdate: true,
		keyframes: {
			0: {
				diameter: 0,
				stroke: 0,
				alpha: 255
			},
			50: {
				diameter: 40,
				stroke: 40,
				alpha: 200
			},
			80: {
				diameter: 85,
				stroke: 20,
				alpha: 100
			},
			100: {
				diameter: 100,
				stroke: 0,
				alpha: 0
			}
		}
	})).start();

	$.sounds.play('sound', 'explosion_' + round(random(1, 4)));
}

Explosion.prototype = new Element();

Explosion.prototype.update = function() {
	if(this.animation.framesElapsed < 5) {
		$.states.background.active = 'light';
		$.config.baseColor = color(100);
	}
	else {
		$.states.background.active = 'base';
		$.config.baseColor = color(0);
	}

	this.dead = this.animation.isRunning === false;
}

Explosion.prototype.draw = function() {
    stroke($.config.baseColor, this.animation.get('alpha'));
	strokeWeight(this.animation.get('stroke'));
	noFill();
	ellipse(this.x, this.y, this.animation.get('diameter'), this.animation.get('diameter'));
}