function EnemyBomb(type) {
	Element.call(this);

    this.type = 'EnemyBomb';
    this.id = this.type + '_' + newId();
    this.layer = 5;

    var columns = 20;
    this.x = round(random(1, columns)) * (windowWidth / columns) - ((windowWidth / columns) / 2);
    this.y = -40;
    this.height = 30;
    this.width = 60;
    this.speed = 1;
    this.direction = 90;
    this.life = round(random(1, 10 + floor(((millis() / 1000) - $.states.start) * 0.05)));

    this.moviment = this.x > windowWidth / 2;
}

EnemyBomb.prototype = new Element();

EnemyBomb.prototype.update = function() {
    var self = this;
    
    this.direction = this.direction + (this.moviment == 1 ? 0.5 : -0.5);
    this.moviment = this.direction >= 120 || this.direction <= 60 ? !this.moviment : this.moviment;
    
    // Verifica se bateu no chão
    if(this.y + (this.width / 2) > $.elements.Ground.y) {
        if($.elements.Player)
            $.elements.Player._hit(this.life);

        this._die();
    }

    // Verifica colisões
    else if($.types.PlayerBullet)
        Object.keys($.types.PlayerBullet).forEach(function(id) {
            var bulletCoord = getPoint(self.x, self.y, $.elements[id].x, $.elements[id].y, -self.direction);

            //if(collidePointRect(bulletCoord.x, bulletCoord.y, self.x - (self.width / 2), self.y - (self.height / 2), self.width, self.height)) {
            if(collideRectCircle(self.x - (self.width / 2), self.y - (self.height / 2), self.width, self.height, bulletCoord.x, bulletCoord.y, $.elements[id].diameter)) {
                $.states.points = $.states.points + self.life;
                $.elements[id]._hit(1);
                self._hit(1);
            }
        });
}

EnemyBomb.prototype.draw = function() {
    translate(this.x, this.y);
    rotate(this.direction);
    translate(-(this.width / 2), -(this.height / 2));
    
    fill(255);
    strokeWeight(2);
    stroke(0);
    
    // Asa de cima
    beginShape();
    vertex(0, 0);
    vertex(this.width * 0.3, 0);
    vertex(this.width * 0.4, this.height * 0.38);
    vertex(this.width * 0.1, this.height * 0.38);
    endShape(CLOSE);
    
    // Asa de baixo
    beginShape();
    vertex(this.width * 0.1, this.height * 0.62);
    vertex(this.width * 0.4, this.height * 0.62);
    vertex(this.width * 0.3, this.height);
    vertex(0, this.height);
    endShape(CLOSE);

    // Corpo
    rect(this.width * 0.2, this.height * 0.05, this.width * 0.8, this.height * 0.9, (this.height * 0.9) / 2);

    // Asa do meio
    rect(0, this.height * 0.45, this.width * 0.4, this.height * 0.1);

    // Life
    translate(this.width * 0.65, this.height / 2);
    rotate(-this.direction);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.life, 0, 0);
}

EnemyBomb.prototype.die = function() {
    $.appendElement(new Explosion(this));
}