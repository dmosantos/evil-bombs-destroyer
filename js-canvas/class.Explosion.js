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
				r: 0,
				g: 0,
				b: 0,
				alpha: 255
			},
			50: {
				diameter: 40,
				stroke: 40,
				red: 255,
				r: 255,
				g: 255,
				b: 0,
				alpha: 200
			},
			80: {
				diameter: 85,
				stroke: 20,
				r: 255,
				g: 0,
				b: 0,
				alpha: 100
			},
			100: {
				diameter: 100,
				stroke: 0,
				r: 0,
				g: 0,
				b: 0,
				alpha: 0
			}
		}
	})).start();
}

Explosion.prototype = new Element();

Explosion.prototype.update = function() {
	if(this.animation.framesElapsed < 5)
		$.states.background = 100 * noise(millis() / 500);
	else
		$.states.background = 0;
}

Explosion.prototype.draw = function() {
    stroke(255, this.animation.get('alpha'));
    //stroke(this.animation.get('r'), this.animation.get('g'), this.animation.get('b'), this.animation.get('alpha'));
	strokeWeight(this.animation.get('stroke'));
	noFill();
	ellipse(this.x, this.y, this.animation.get('diameter'), this.animation.get('diameter'));
}