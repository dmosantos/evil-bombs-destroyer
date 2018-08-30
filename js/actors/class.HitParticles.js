function HitParticles(parent) {
	Element.call(this);

	this.type = 'HitParticles';
	this.id = this.type + '_' + newId();
	this.layer = 20;

	this.x = parent.x;
	this.y = parent.y;
	this.diameter = 150;

	this.animation = (new Animation(this, {
		duration: 100,
		keyframes: {
			0: {
				particle: 1
			},
			100: {
				particle: 10
			}
		}
	})).start();
	this.lastParticle = 0;
}

HitParticles.prototype = new Element();

HitParticles.prototype.update = function() {
	this.dead = !this.animation.isRunning;
}

HitParticles.prototype.draw = function() {
	if(this.lastParticle != round(this.animation.get('particle'))) {
		this.lastParticle = round(this.animation.get('particle'))
		$.appendElement(new Particle(this));
		$.appendElement(new Particle(this));
	}
}