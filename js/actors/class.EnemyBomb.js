function EnemyBomb() {
	Element.call(this);

    if(typeof random != 'undefined') {
        this.type = 'EnemyBomb';
        this.id = this.type + '_' + newId();
        this.layer = 5;

        this.x = round(random(50, width - 50));
        this.y = -30;
        this.height = 30;
        this.width = 60;
        this.speed = 1;
        this.direction = 90;
        this.life = round(random(1, $.states.enemyMaxLife)) || 1;

        //var lado = round(random(1, 2));
        var lado = this.x >= width / 2 ? 1 : 2;
        this.animation = (new Animation(this, {
            duration: 10000,
            loop: true,
            mode: 'FRAMERATE',
            keyframes: {
                0: {
                    direction: 0
                },
                25: {
                    direction: lado == 1 ? 30 : -30
                },
                75: {
                    direction: lado == 1 ? -30 : 30
                },
                100: {
                    direction: 0
                }
            }
        })).start();

        this.animationFire = (new Animation(this, {
            duration: 100,
            loop: true,
            mode: 'FRAMERATE',
            keyframes: {
                0: {
                    size: 1
                },
                50: {
                    size: 0.5
                },
                100: {
                    size: 1
                }
            }
        })).start();

        this.initialDirection = this.direction;
        this.lastHit = 0;
    }
}

EnemyBomb.prototype = new Element();

EnemyBomb.prototype.update = function() {
    var self = this;
    
    this.direction = this.initialDirection + this.animation.get('direction');
    
    // Verifica se bateu no chão
    if(this.y + (this.width / 2) > ($.elements.Ground ? $.elements.Ground.y : height)) {
        if($.elements.Player)
            $.elements.Player._hit(this.life);

        this._die();
    }

    // Verifica colisões
    else if($.by.types.PlayerBullet)
        Object.keys($.by.types.PlayerBullet).forEach(function(id) {
            var bulletCoord = getPoint(self.x, self.y, $.elements[id].x, $.elements[id].y, -self.direction);

            if(collideRectCircle(self.x - (self.width / 2), self.y - (self.height / 2), self.width, self.height, bulletCoord.x, bulletCoord.y, $.elements[id].diameter)) {
                $.elements[id]._hit(1);
                self._hit(1);
            }
        });
}

EnemyBomb.prototype.draw = function() {
    translate(this.x, this.y);
    rotate(this.direction);
    translate(-(this.width / 2), -(this.height / 2));

    noStroke();
    
    // Fogo
    fill(255, 50);
    beginShape();
    
    curveVertex(this.width * 0.2, this.height * 0.5);
    
    curveVertex(this.width * 0.19, this.height * 0.4 * this.animationFire.get('size'));
    curveVertex(this.width * 0.12, this.height * 0.3 * this.animationFire.get('size'));
    curveVertex(0, this.height * 0.4);
    
    curveVertex((this.width * -0.5) * random(this.animationFire.get('size'), this.animationFire.get('size') * 0.5), this.height * random(0.4, 0.6));

    curveVertex(0, this.height * 0.6);
    curveVertex(this.width * 0.12, this.height * (0.7 + 0.3 - (0.3 * this.animationFire.get('size'))));
    curveVertex(this.width * 0.19, this.height * (0.6 + 0.4 - (0.4 * this.animationFire.get('size'))));

    curveVertex(this.width * 0.2, this.height * 0.5);

    endShape(CLOSE);
    
    if($.states.frames.count <= this.lastHit + 1)
        fill(70);
    else
        fill(this.animation.get('color') || $.config.baseColor);
    
    // Asa de cima
    beginShape();
    vertex(0, 0);
    vertex(this.width * 0.25, 0);
    vertex(this.width * 0.4, this.height * 0.38);
    vertex(this.width * 0.1, this.height * 0.38);
    endShape(CLOSE);
    
    // Asa de baixo
    beginShape();
    vertex(this.width * 0.1, this.height * 0.62);
    vertex(this.width * 0.4, this.height * 0.62);
    vertex(this.width * 0.25, this.height);
    vertex(0, this.height);
    endShape(CLOSE);

    // Corpo
    rect(this.width * 0.2, this.height * 0.05, this.width * 0.8, this.height * 0.9, (this.height * 0.9) / 2);

    // Asa do meio
    rect(0, this.height * 0.45, this.width * 0.4, this.height * 0.1);

    // Life
    translate(this.width * 0.65, this.height / 2);
    rotate(-this.direction);
    fill($.config.secondColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    text(this.life, 0, 0);
}

EnemyBomb.prototype.hit = function() {
    $.sounds.play('sound', 'hit');
    $.appendElement(new HitParticles(this));
    $.states.points = $.states.points + this.life;
    this.lastHit = $.states.frames.count;
}

EnemyBomb.prototype.die = function() {
    $.appendElement(new Explosion(this));
}


/* EnemyBomb2 */
function EnemyBomb2() {
    EnemyBomb.call(this);

    this.x = width / 2;
    this.y = -35;
    this.height = 45;
    this.width = 70;
    this.speed++;

    this.animation = (new Animation(this, {
        duration: 500,
        loop: true,
        mode: 'FRAMERATE',
        keyframes: {
            0: {
                direction: 0,
                color: 0
            },
            50: {
                direction: 0,
                color: 100
            },
            100: {
                direction: 0,
                color: 0
            }
        }
    })).start();
}

EnemyBomb2.prototype = new EnemyBomb();

EnemyBomb2.prototype.die = function() {
    $.appendElement(new Explosion(this));
    
    var bomb1 = new EnemyBomb3(1);
    var bomb2 = new EnemyBomb3(2);

    bomb1.x = this.x - 10;
    bomb1.y = this.y;

    bomb2.x = this.x + 10;
    bomb2.y = this.y;

    $.appendElement(bomb1);
    $.appendElement(bomb2);
}

/* EnemyBomb3 */
function EnemyBomb3(lado) {
    EnemyBomb.call(this);

    this.height = 20;
    this.width = 50;

    this.animation = (new Animation(this, {
        duration: 5000,
        loop: true,
        mode: 'FRAMERATE',
        keyframes: {
            0: {
                direction: 0
            },
            25: {
                direction: lado == 1 ? 90 : -90
            },
            75: {
                direction: lado == 1 ? -90 : 90
            },
            100: {
                direction: 0
            }
        }
    })).start();
}

EnemyBomb3.prototype = new EnemyBomb();