function EnemyBomb(type) {
	Element.call(this);
	this.init();

    this.$.setAttribute('class', 'enemy-bomb enemy-bomb-' + type + ' remover');

    switch(type) {
        case 1:
            this.speed = 1;
            break;
        case 2:
            this.speed = 2.5;
            break;
        case 3:
            this.speed = 4;
            break;
        case 4:
            this.speed = 8;
            break;
    }

    this.$enemyBombBody = document.createElement("img");
    
    this.$enemyBombBody.setAttribute('class', 'enemy-bomb-image');
    this.$enemyBombBody.setAttribute('src', 'images/enemy-bomb-' + type + '.svg');
   
    this.$.appendChild(this.$enemyBombBody);
   
    
    // this.$enemyBombBody = document.createElement("div");
    // this.$enemyBombWing1 = document.createElement("div");
    // this.$enemyBombWing2 = document.createElement("div");
    // this.$enemyBombWing3 = document.createElement("div");

    // this.$enemyBombBody.setAttribute('class', 'enemy-bomb-body remover');
    // this.$enemyBombWing1.setAttribute('class', 'enemy-bomb-wing-1 remover');
    // this.$enemyBombWing2.setAttribute('class', 'enemy-bomb-wing-2 remover');
    // this.$enemyBombWing3.setAttribute('class', 'enemy-bomb-wing-3 remover');
    
    //this.$.appendChild(this.$enemyBombBody);
    //this.$.appendChild(this.$enemyBombWing1);
    //this.$.appendChild(this.$enemyBombWing2);
    //this.$.appendChild(this.$enemyBombWing3);
    
    this.x = random(0, $canvas.clientWidth - 30);
    this.y = -60;
    this.width = 30;
    this.height = 60;
    this.direction = 90;

    this.rotateTax = 0.03;
    this.type = type;
    this.moviment = this.x > $canvas.clientWidth / 2;
}

EnemyBomb.prototype = new Element();

EnemyBomb.prototype.update = function() {
    if(this.y + this.height >= $canvas.clientHeight - 30) {
        this.hit();
        $player.hit();
    } else if(this.y + this.height >= $canvas.clientHeight - 300) {
        switch(this.type) {
            case 1:
                this.rotateTax = 0.3;
                break;
            case 2:
                this.rotateTax = 0.4;
                break;
            case 3:
                this.rotateTax = 0.5;
                break;
        }
    }
    
    var angleDeg = this.getAngleWith($player);

    if(this.type == 1 || this.type == 4) {
        this.direction = this.direction + (this.moviment == 1 ? (this.type == 4 ? 4 : 0.5) : -(this.type == 4 ? 4 : 0.5));
        this.moviment = this.direction >= 180 || this.direction <= 0 ? !this.moviment : this.moviment;
    } else {
        this.direction = this.direction > angleDeg
            ? this.direction - this.rotateTax
            : this.direction < angleDeg
                ? this.direction + this.rotateTax
                : angleDeg;
    }
}

EnemyBomb.prototype.render = function() {
    this.$.style.transform = 'rotate(' + (this.direction - 90) + 'deg)';
}

EnemyBomb.prototype.hit = function() {
    this.life--;
}

EnemyBomb.prototype.die = function() {
    new Explosion(this);
    points = points + this.type;

    if(this.y + this.height <= $canvas.clientHeight - 100 && bonus.ready == true) {
        switch(random(1, 4)) {
            case 1:
                new Bonus(this, 'tribullet');
                break;
            case 2:
                new Bonus(this, 'multiplebullet');
                break;
            case 3:
                new Bonus(this, 'speedbullet');
                break;
            case 4:
                new Bonus(this, 'life');
                break;
        }
        bonus.ready = false;
        /*if(random(1, 100) >= 97)
            new Bonus(this, 'tribullet');
        else if(random(1, 100) >= 97)
            new Bonus(this, 'multiplebullet');
        else if(random(1, 100) >= 97)
            new Bonus(this, 'speedbullet');
        else if(random(1, 100) >= 97)
            new Bonus(this, 'life');*/
    }
}

EnemyBomb.prototype.onCollide = {
    PlayerBullet: function(self, $PlayerBullet) {
        $PlayerBullet.baseDie();
        self.baseDie();
    }
}