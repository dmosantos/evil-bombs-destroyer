function Element() {
    this.type = null;
    this.id = null;
    this.layer = 1;
    this.context = $ ? $.states.currentContext : null;

    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.diameter = 0;
    this.speed = 0;
    this.direction = 0;
    this.life = 1;
    this.dead = false;
    this.sprite = null;
}

Element.prototype._update = function() {
    if(this.speed > 0) {
        this.x = this.x + (Math.cos(this.direction * Math.PI / 180) * this.speed);
        this.y = this.y + (Math.sin(this.direction * Math.PI / 180) * this.speed);
    }

    if(this.update)
        this.update();

    if(this.life <= 0) {
        this._die();
    }
}

Element.prototype._draw = function() {
    if(this.draw)
        this.draw();
}

Element.prototype._die = function() {
    //l('die ' + this.id);
    if(this.die)
        this.die();
    
    this.dead = true;
}

Element.prototype._hit = function(damage) {
    if(damage)
        this.life = this.life - damage;

    if(this.life <= 0) {
        this._die();
    }
    if(this.hit)
        this.hit();
}

Element.prototype._checkClick = function() {
    if(collidePointRect(mouseX, mouseY, this.x, this.y, this.width, this.height) && this.click) {
        $.states.shooting = false;
        this.click();
    }
}