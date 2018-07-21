function Bonus(parent, type) {
	Element.call(this);
	this.init();

	this.$.setAttribute('class', 'bonus bonus-' + type + ' remover');

    this.width = 30;
    this.height = 30;
	this.direction = 90;
    this.speed = 3;
    this.type = type;

    this.x = parent.x - (this.width / 2) + (parent.width / 2);
    this.y = parent.y - (this.height / 2) + (parent.height / 2);
    
    this.moviment = random(1, 2) == 1;
}

Bonus.prototype = new Element();

Bonus.prototype.update = function() {
	this.direction = this.direction + (this.moviment == 1 ? 2 : -2);
	this.moviment = this.direction >= 180 || this.direction <= 0 ? !this.moviment : this.moviment;

	if(this.y + this.height > $canvas.clientHeight)
		this.baseDie();
}

Bonus.prototype.die = function() {
	points = points + 5;
}

Bonus.prototype.onCollide = {
	PlayerBullet: function(self, $PlayerBullet) {
		$PlayerBullet.baseDie();
		self.baseDie();
        $player.activateBonus(self.type);
	}
}