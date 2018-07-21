function Element(parent) {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.width = 0;
    this.height = 0;
    this.$ = null;
    this.direction = 0;
    this.life = 1;
    this.dead = false;
    this.$ = document.createElement("div");
}

Element.prototype.init = function() {
    $canvas.appendChild(this.$);
    elements.push(this);
}

Element.prototype.baseUpdate = function() {
    if(this.speed > 0) {
        this.x = this.x + (Math.cos(this.direction * Math.PI / 180) * this.speed);
        this.y = this.y + (Math.sin(this.direction * Math.PI / 180) * this.speed);
    }

    if(this.update)
        this.update();

    if(this.onCollide && !this.dead) {
        var self = this;
        Object.keys(this.onCollide).map(function(objectKey, index) {
            var value = self.onCollide[objectKey];

            for(var j = 0; j < elements.length; j++) {
                if(elements[j] instanceof window[objectKey]) {
                    if(self.collideWith(elements[j]) && !elements[j].dead) {
                        value(self, elements[j]);
                    }
                }
            }
        });
    }

    if(this.life <= 0)
        this.baseDie();
}

Element.prototype.baseRender = function() {
    this.$.style.left = this.x + 'px';
    this.$.style.top = this.y + 'px';
    
    if(this.render)
        this.render();
}

Element.prototype.baseHit = function() {
    if(this.hit)
        this.hit();
}

Element.prototype.baseDie = function() {
    if(this.die)
        this.die();
    
    this.$.remove();
    this.dead = true;
}

Element.prototype.collideWith = function(target) {
    return !(
        ((this.y + this.height) < (target.y)) ||
        (this.y > (target.y + target.height)) ||
        ((this.x + this.width) < target.x) ||
        (this.x > (target.x + target.width))
    );
}

Element.prototype.getAngleWith = function(target, source) {
    var p1 = source || {
        x: this.x + (this.width / 2),
        y: this.y + (this.height / 2)
    };

    var p2 = {
        x: target.x + (target.width / 2),
        y: target.y + (target.height / 2)
    };

    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}