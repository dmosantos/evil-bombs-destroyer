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
    
    this.lastShoot = null;
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
        this.lastShoot = frameCount;
    }
}

Player.prototype.draw = function() {
    fill($.config.baseColor);
    noStroke();

    // Canhão
    translate(this.x, this.y - 5);
    rotate(this.direction);
    if(frameCount - this.lastShoot <= 5) {
        fill(255, 100);
        arc(65, 0, 40, 20, 90, 270, CHORD);
        fill($.config.baseColor);
        strokeWeight(2);
        stroke(255, 100);
    }
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