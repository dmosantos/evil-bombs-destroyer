function Particle(parent) {
	Element.call(this);

	this.type = 'Particle';
	this.id = this.type + '_' + newId();
	this.layer = 20;

	this.x = parent.x;
	this.y = parent.y;
	this.diameter = 3;

	this.animation = (new Animation(this, {
		duration: 300,
		keyframes: {
			0: {
				x: this.x,
				y: this.y
			},
			100: {
				x: round(random(this.x - 80, this.x + 80)),
				y: round(random(this.y - 80, this.y + 80))
			}
		}
	})).start();

	this.animationAlpha = (new Animation(this, {
		duration: 500,
		keyframes: {
			0: {
				alpha: 100
			},
			90: {
				alpha: 100
			},
			100: {
				alpha: 0
			}
		}
	})).start();
}

Particle.prototype = new Element();

Particle.prototype.update = function() {
	this.dead = !this.animation.isRunning;
}

Particle.prototype.draw = function() {
	noStroke();
	fill(0, this.animationAlpha.get('alpha'));
	ellipse(this.animation.get('x'), this.animation.get('y'), this.diameter, this.diameter);
}