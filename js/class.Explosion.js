function Explosion(parent) {
	Element.call(this);
	this.init();

	this.$.setAttribute('class', 'explosion remover');

    this.width = 100;
    this.height = 100;

    this.x = parent.x - (this.width / 2) + (parent.width / 2);
    this.y = parent.y - (this.height / 2) + (parent.height / 2);
    
    setTimeout(self.baseDie, 2000);
}

Explosion.prototype = new Element();