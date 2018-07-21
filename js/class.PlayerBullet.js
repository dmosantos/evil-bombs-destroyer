function PlayerBullet() {
	Element.call(this);
	this.init();

	this.$.setAttribute('class', 'player-bullet remover');

	this.direction = $player.direction - 90;

	this.x = ($player.x + 30) - 5 + (Math.cos(this.direction * Math.PI / 180) * 50);
	this.y = ($player.y + 50) - 5 + (Math.sin(this.direction * Math.PI / 180) * 50);

	this.width = 10;
	this.height = 10;
	this.speed = bonus.speedbullet.active ? 40 : 10;

}

PlayerBullet.prototype = new Element();

PlayerBullet.prototype.update = function() {
    if(this.x < -this.width || this.y < -this.height || this.x > this.width + $canvas.clientWidth || this.y > this.height + $canvas.clientHeight)
        this.baseDie();
}

PlayerBullet.prototype.hit = function() {
    this.life--;
}