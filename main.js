var running;
var points;
var $canvas;
var $points;
var $player;
var elements;
var clientX;
var clientY;
var frameTimeout, enemyTimeout;

function reset() {
    running = false;
    points = 0;
    $canvas = document.getElementById("canvas");
    $points = document.getElementById("points");
    $player;
    elements = [];
    clientX = 0;
    clientY = 0;
    
    clearTimeout(frameTimeout);
    clearTimeout(enemyTimeout);
    
    var $remover = document.querySelectorAll('.remover');;
    $remover.forEach(function($elem) {
        $elem.remove();
    });
    
    start();
}

function Element(type, parent) {
    var self = this;

    this.type = type;
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.width = 0;
    this.height = 0;
    this.$ = null;
    this.direction = 0;
    this.dead = false;
    
    this.update = function() {
        if(this.speed > 0) {
            this.x = this.x + (Math.cos(this.direction * Math.PI / 180) * this.speed);
            this.y = this.y + (Math.sin(this.direction * Math.PI / 180) * this.speed);
        }
        
        update();
    }
    
    this.render = function() {
        //if(this.speed > 0) {
            this.$.style.left = this.x + 'px';
            this.$.style.top = this.y + 'px';
        //}
        
        render();
    }
    
    this.die = function() {
        die();
        
        this.$.remove();
        this.dead = true;
    }
    
    var update = function() {}
    var render = function() {}
    var die = function() {}
    
    this.$ = document.createElement("div");
    
    switch(type) {

        case 'bomb':
            this.$.setAttribute('class', 'enemy-bomb remover');

            var $enemyBombBody = document.createElement("div");
            var $enemyBombWing1 = document.createElement("div");
            var $enemyBombWing2 = document.createElement("div");
            var $enemyBombWing3 = document.createElement("div");
            
            $enemyBombBody.setAttribute('class', 'enemy-bomb-body remover');
            $enemyBombWing1.setAttribute('class', 'enemy-bomb-wing-1 remover');
            $enemyBombWing2.setAttribute('class', 'enemy-bomb-wing-2 remover');
            $enemyBombWing3.setAttribute('class', 'enemy-bomb-wing-3 remover');
            
            this.$.appendChild($enemyBombBody);
            this.$.appendChild($enemyBombWing1);
            this.$.appendChild($enemyBombWing2);
            this.$.appendChild($enemyBombWing3);
            
            this.x = random(0, $canvas.clientWidth - 30);
            this.y = -60;
            this.width = 30;
            this.height = 60;
            this.direction = 90;
            this.speed = 2;
            
            update = function() {
                if(self.y + self.height >= $canvas.clientHeight - 30) {
                    points--;
                    if(points < -5) {
                        gameOver();
                    }
                    self.die();
                }
            }
            
            die = function() {
                new Element('explosion', self);
            }

            break;
            
        case 'player':
            this.$.setAttribute('id', 'player');
            this.$.setAttribute('class', 'remover');

            var $playerBody = document.createElement("div");
            var $playerWeapon = document.createElement("div");
            
            $playerBody.setAttribute('id', 'player-body');
            $playerBody.setAttribute('class', 'remover');
            $playerWeapon.setAttribute('id', 'player-weapom');
            $playerWeapon.setAttribute('class', 'remover');
            
            this.$.appendChild($playerBody);
            this.$.appendChild($playerWeapon);
            
            this.x = $canvas.clientWidth / 2 - 30;
            this.y = $canvas.clientHeight - 90;
            this.width = 60;
            this.height = 60;
            this.direction = -90;

            update = function() {
                self.x = $canvas.clientWidth / 2 - 30;
                self.y = $canvas.clientHeight - 90;
                
                var p1 = {
                    x: self.x + 30,
                    y: self.y + 60
                };

                var p2 = {
                    x: clientX,
                    y: clientY
                };

                var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

                self.direction = angleDeg + 90;
                self.direction =
                    self.direction > 90 && self.direction < 180
                        ? 90
                        : self.direction < -90 || self.direction >= 180
                            ? -90
                            : self.direction;
            }

            render = function() {
                $playerWeapon.style.transform = 'rotate(' + (self.direction) + 'deg)';
            }

            break;
        
        case 'player-bullet':
            this.$.setAttribute('class', 'player-bullet remover');

            this.direction = $player.direction - 90;

            this.x = ($player.x + 30) - 5 + (Math.cos(this.direction * Math.PI / 180) * 50);
            this.y = ($player.y + 50) - 5 + (Math.sin(this.direction * Math.PI / 180) * 50);
            
            this.width = 10;
            this.height = 10;
            this.speed = 10;
            
            break;

        case 'explosion':
            this.$.setAttribute('class', 'explosion remover');

            this.width = 100;
            this.height = 100;

            this.x = parent.x - (this.width / 2) + (parent.width / 2);
            this.y = parent.y - (this.height / 2) + (parent.height / 2);
            
            setTimeout(function() {
                self.die();
            }, 1000);
            
            break;
    }
    
    elements.push(this);
    $canvas.appendChild(this.$);
}

function frame() {
    
    for(var i = 0; i < elements.length; i++) {
        elements[i].update();
        elements[i].render();

        switch(elements[i].type) {
            case 'player-bullet':
                for(var j = 0; j < elements.length; j++) {
                    if(elements[j].type == 'bomb') {
                        if(isCollide(elements[i], elements[j])) {
                            elements[i].die();
                            elements[j].die();
                            points++;
                        }
                    }
                }
                break;
        }
        
    }
    
    $points.innerHTML = points;

    elements = elements.filter(function(item, index){
        return !item.dead;
    });

    
    if(running)
        frameTimeout = setTimeout(frame, 16);
}

function start() {
    running = true;
    
    $player = new Element('player');
    
    function createEnemy() {
        new Element('bomb');
        if(running)
            enemyTimeout = setTimeout(createEnemy, 1000);
    }
    
    createEnemy();
    frame();
}

function stop() {
    running = false;
}

function shoot() {
    if(running) {
        new Element('player-bullet');
    }
}

function gameOver() {
    alert('Você perdeu!!!\n\nSEU BOSTA!');
    
    reset();
}

function random(from, to) {
    return Math.floor(Math.random() * to) + from;
}

function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

window.onmousemove = logMouseMove;
function logMouseMove(event) {
	var e = e || window.event;	
	clientX = e.clientX;
    clientY = e.clientY;
}

function l(x){ console.log(x); }

reset();