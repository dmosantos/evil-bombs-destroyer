function Player() {
	Element.call(this);
	this.init();

	this.$.setAttribute('id', 'player');
	this.$.setAttribute('class', 'remover');

	this.$playerBody = document.createElement("div");
	this.$playerWeapon = document.createElement("div");

	this.$playerBody.setAttribute('id', 'player-body');
	this.$playerBody.setAttribute('class', 'remover');
	this.$playerWeapon.setAttribute('id', 'player-weapom');
	this.$playerWeapon.setAttribute('class', 'remover');

	this.$.appendChild(this.$playerBody);
	this.$.appendChild(this.$playerWeapon);

	this.life = 10;
	this.x = $canvas.clientWidth / 2 - 30;
	this.y = $canvas.clientHeight - 90;
	this.width = 60;
	this.height = 60;
	this.direction = -90;
}

Player.prototype = new Element();

Player.prototype.update = function() {
    this.x = $canvas.clientWidth / 2 - 30;
    this.y = $canvas.clientHeight - 90;
    
    var p1 = {
        x: this.x + 30,
        y: this.y + 55
    };

    var p2 = {
        x: clientX,
        y: clientY,
        width: 0,
        height: 0
    };

    var angleDeg = this.getAngleWith(p2, p1);

    this.direction = angleDeg + 90;
    this.direction =
        this.direction > 90 && this.direction < 180
            ? 90
            : this.direction < -90 || this.direction >= 180
                ? -90
                : this.direction;

    if(bonus.multiplebullet.active && frame % 5 == 0)
        shooting = true;

    if(bonus.life.active) {
        this.life = this.life < 10 ? this.life + 1 : 10;
        bonus.life.active = false;
    }

    if(shooting) {
    	if(running) {
            new PlayerBullet();
            if(bonus.tribullet.active) {
                var PlayerBullet1 = new PlayerBullet();
                PlayerBullet1.direction = PlayerBullet1.direction + 10;
                var PlayerBullet2 = new PlayerBullet();
                PlayerBullet2.direction = PlayerBullet2.direction - 10;
            }
        }
    	shooting = false;
    }
}

Player.prototype.render = function() {
    this.$playerWeapon.style.transform = 'rotate(' + (this.direction) + 'deg)';
}

Player.prototype.hit = function() {
    this.life--;
}

Player.prototype.die = function() {
    gameOver();
}

Player.prototype.activateBonus = function(bonusType) {
    clearTimeout(bonus[bonusType].timeout);
    bonus[bonusType].active = true;
    bonus[bonusType].timeout = setTimeout(function() {
        bonus[bonusType].active = false;
    }, bonus[bonusType].duration);
}