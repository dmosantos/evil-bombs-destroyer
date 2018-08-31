function Player() {
    Element.call(this);
    var self = this;

    this.type = 'Player';
    this.id = this.type;
    this.layer = 10;

	this.life = 20;
	this.x = width / 2;
	this.y = height - 50;
	this.width = 60;
	this.height = 60;
    this.direction = -90;
	this.speed = 0;
    
    this.lastShoot = null;

    $.events.on('mouseMoved', this);
    $.events.on('click', this, {
        middleware: function() {
            return collidePointRect(mouseX, mouseY, 0, 0, width, self.y + 10)
        }
    });
}

Player.prototype = new Element();

Player.prototype.update = function() {
    this.x = width / 2;
    this.y = height - 55;

    /*if(keyIsPressed) {
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
             : this.direction;*/

    /*if($.states.shooting) {
        $.sounds.play('sound', 'shoot');
        $.appendElement(new PlayerBullet());
        $.states.shooting = false;
        this.lastShoot = $.states.frames.count;
    }*/
}

Player.prototype.draw = function() {
    fill($.config.baseColor);
    noStroke();

    // Canhão
    translate(this.x, this.y);
    rotate(this.direction);
    if($.states.frames.count - this.lastShoot <= 4) {
        fill(255, 80);
        arc(55, 0, 30, 18, 90, 270, CHORD);
        fill($.config.baseColor);
        strokeWeight(2);
        stroke(255, 100);
    }
    rect(-5, -5, 50, 10, 5);
    rotate(-this.direction);
    translate(-this.x, -(this.y));

    // Corpo
    arc(this.x, this.y + 5, this.width, this.height, 180, 0, CHORD);

    // Life
    fill($.config.secondColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    text(this.life, this.x, this.y - 5);

}

Player.prototype.click = function() {
    $.sounds.play('sound', 'shoot');
    $.appendElement(new PlayerBullet());
    this.lastShoot = $.states.frames.count;
}

Player.prototype.mouseMoved = function() {
    this.direction = atan2(mouseY - this.y, mouseX - this.x);

    this.direction =
        this.direction > 0 && this.direction < 90
            ? 0
            : this.direction > 0 && this.direction >= 90
             ? 180
             : this.direction;
}

Player.prototype.die = function() {
    $.contexts.change('gameOver');
}