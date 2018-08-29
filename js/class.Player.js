function Player() {
    Element.call(this);

    this.type = 'Player';
    this.id = this.type;
    this.layer = 10;

	this.life = 20;
	this.x = windowWidth / 2;
	this.y = windowHeight - 50;
	this.width = 60;
	this.height = 60;
    this.direction = -90;
	this.speed = 0;
    
}

Player.prototype = new Element();

Player.prototype.update = function() {
    this.x = windowWidth / 2;
    this.y = windowHeight - 50;

    if(keyIsPressed) {
        if(keyCode === LEFT_ARROW)
            this.direction--;
        
        if(keyCode === RIGHT_ARROW)
            this.direction++;
        
        if(keyCode === 32)
            $.states.shooting = true;
    }
    else
        this.direction = atan2(mouseY - this.y, mouseX - this.x);

    this.direction =
        this.direction > 0 && this.direction < 90
            ? 0
            : this.direction > 0 && this.direction >= 90
             ? 180
             : this.direction;

    if($.states.shooting) {
        $.sounds.play('sound', 'shoot');
        $.appendElement(new PlayerBullet());
        $.states.shooting = false;
    }
}

Player.prototype.draw = function() {
    fill($.config.baseColor);
    noStroke();

    // Canhão
    translate(this.x, this.y - 5);
    rotate(this.direction);
    rect(0, -5, 50, 10, 5);
    rotate(-this.direction);
    translate(-this.x, -(this.y - 5));

    // Corpo
    //strokeWeight(2);
    //stroke(0);
    arc(this.x, this.y, this.width, this.height, 180, 0, CHORD);

    // Life
    fill($.config.secondColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    text(this.life, this.x, this.y - 10);
}

Player.prototype.die = function() {
    
}

//Player.prototype = new Element();

/*Player.prototype.update = function() {
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

Player.prototype.die = function() {
    gameOver();
}

Player.prototype.activateBonus = function(bonusType) {
    clearTimeout(bonus[bonusType].timeout);
    bonus[bonusType].active = true;
    bonus[bonusType].timeout = setTimeout(function() {
        bonus[bonusType].active = false;
    }, bonus[bonusType].duration);
}*/