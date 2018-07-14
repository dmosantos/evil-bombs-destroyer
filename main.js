var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 16);
    };

var running;
var points;
var $canvas;
var $points;
var $player;
var $playerLife;
var elements;
var clientX;
var clientY;
var dtStart;
var dtLastEnemy;
var newEnemyTimer;
var nivel;

function reset() {
    stop();
    start();
}

function pause() {
    running = !running;
}

function stop() {
    running = false;
    dtStart = null;
    points = 0;
    $canvas = document.getElementById("canvas");
    $points = document.getElementById("points");
    $player = null;
    $playerLife = null;
    elements = [];
    clientX = 0;
    clientY = 0;
    nivel = 1;

    var $remover = document.querySelectorAll('.remover');;
    $remover.forEach(function($elem) {
        $elem.remove();
    });
}

function start() {
    if(dtStart)
        stop();

    running = true;
    dtStart = new Date();
    dtLastEnemy = new Date();
    newEnemyTimer = 1000;
    
    $player = new Element('player');
    $playerLife = new Element('player-life');
}

reset();

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
    this.life = 1;
    this.dead = false;
    
    this.update = function() {
        if(this.speed > 0) {
            this.x = this.x + (Math.cos(this.direction * Math.PI / 180) * this.speed);
            this.y = this.y + (Math.sin(this.direction * Math.PI / 180) * this.speed);
        }
        
        update();

        if(this.life <= 0)
            this.die();
    }
    
    this.render = function() {
        this.$.style.left = this.x + 'px';
        this.$.style.top = this.y + 'px';
        
        render();
    }

    this.hit = function() {
        hit();
    }
    
    this.die = function() {
        die();
        
        this.$.remove();
        this.dead = true;
    }
    
    var update = function() {}
    var render = function() {}
    var hit = function() {}
    var die = function() {}
    
    this.$ = document.createElement("div");
    
    switch(type) {

        case 'bomb-1':
        case 'bomb-2':
        case 'bomb-3':
            var rotateTax = 0.03;

            switch(type) {
                case 'bomb-1':
                    this.$.setAttribute('class', 'enemy-bomb enemy-bomb-1 remover');
                    this.speed = 1;
                    break;
                case 'bomb-2':
                    this.$.setAttribute('class', 'enemy-bomb enemy-bomb-2 remover');
                    this.speed = 2.5;
                    break;
                case 'bomb-3':
                    this.$.setAttribute('class', 'enemy-bomb enemy-bomb-3 remover');
                    this.speed = 4;
                    break;
            }

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

            update = function() {
                if(self.y + self.height >= $canvas.clientHeight - 30) {
                    self.hit();
                    $player.hit();
                } else if(self.y + self.height >= $canvas.clientHeight - 300) {
                    switch(type) {
                        case 'bomb-1':
                            rotateTax = 0.3;
                            break;
                        case 'bomb-2':
                            rotateTax = 0.4;
                            break;
                        case 'bomb-3':
                            rotateTax = 0.5;
                            break;
                    }
                }
                
                var p1 = {
                    x: self.x + (self.width / 2),
                    y: self.y + (self.height / 2)
                };

                var p2 = {
                    x: $player.x + ($player.width / 2),
                    y: $player.y + $player.height
                };

                var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

                self.direction = self.direction > angleDeg
                    ? self.direction - rotateTax
                    : self.direction < angleDeg
                        ? self.direction + rotateTax
                        : angleDeg;
            }

            render = function() {
                self.$.style.transform = 'rotate(' + (self.direction - 90) + 'deg)';
            }

            hit = function() {
                self.life--;
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
            
            this.life = 10;
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

            hit = function() {
                self.life--;
            }

            die = function() {
                gameOver();
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

            update = function() {
                if(self.x < -self.width || self.y < -self.height || self.x > self.width + $canvas.clientWidth || self.y > self.height + $canvas.clientHeight)
                    self.die();
            }

            hit = function() {
                self.life--;
            }
            
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

        case 'player-life':
            this.$.setAttribute('id', 'player-life');
            this.$.setAttribute('class', 'remover');

            var $playerLifeBar = document.createElement("div");
            
            $playerLifeBar.setAttribute('id', 'player-life-bar');
            $playerLifeBar.setAttribute('class', 'remover');
            
            this.$.appendChild($playerLifeBar);
            
            this.x = 5;
            this.y = 5;
            this.width = 10;
            this.height = 75;

            update = function() {
                self.height = $player.life * 100 / 10;
            }

            render = function() {
                $playerLifeBar.style.height = self.height + '%';
            }

            break;
    }
    
    elements.push(this);
    $canvas.appendChild(this.$);
}

function frame() {
    if(running) {
        if((new Date()) - dtLastEnemy > newEnemyTimer)  {
            switch(random(1, nivel >= 2 && nivel <= 4 ? 2 : nivel == 5 ? 3 : 1)) {
                case 1:
                    new Element('bomb-1');
                    break;
                case 2:
                    new Element('bomb-2');
                    break;
                case 3:
                    new Element('bomb-3');
                    break;
            }
            dtLastEnemy = new Date();
            newEnemyTimer = random(nivel < 5 ? 1000 : 500, 6000 - (nivel * 1000));
        }

        for(var i = 0; i < elements.length; i++) {
            if(elements[i])
                elements[i].update();
            if(elements[i])
                elements[i].render();

            if(elements[i]) {
                switch(elements[i].type) {
                    case 'player-bullet':
                        for(var j = 0; j < elements.length; j++) {
                            if(elements[j].type == 'bomb-1' || elements[j].type == 'bomb-2' || elements[j].type == 'bomb-3') {
                                if(isCollide(elements[i], elements[j])) {
                                    if(elements[i])
                                        elements[i].die();
                                    if(elements[j])
                                        elements[j].die();
                                    points++;
                                }
                            }
                        }
                        break;
                }
            }
        }
        
        $points.innerHTML = points;

        elements = elements.filter(function(item, index){
            return !item.dead;
        });
    
        if((new Date()) - dtStart > 5000 && nivel == 1)
            nivel = 2;
        else if((new Date()) - dtStart > 20000 && nivel == 2)
            nivel = 3;
        else if((new Date()) - dtStart > 40000 && nivel == 3)
            nivel = 4;
        else if((new Date()) - dtStart > 60000 && nivel == 4)
            nivel = 5;
    }
    requestAnimFrame(frame);
}
frame();

function shoot(e) {
    if(running) {
        var e = e || window.event;  
        clientX = e.clientX;
        clientY = e.clientY;

        $player.update();

        new Element('player-bullet');
    }
}

function gameOver() {
    stop();
    alert('Você perdeu!!!');
    start();
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
function logMouseMove(e) {
	var e = e || window.event;	
	clientX = e.clientX;
    clientY = e.clientY;
}

function l(x){ console.log(x); }

(function() {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ("onfocusin" in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var v = "visible", h = "hidden",
        evtMap = {
            focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
        };

        evt = evt || window.event;
        if (evt.type in evtMap)
            document.body.className = evtMap[evt.type];
        else
            document.body.className = this[hidden] ? "hidden" : "visible";

        if(dtStart)
            running = document.body.className == "visible";
    }

    // set the initial state (but only if browser supports the Page Visibility API)
    if( document[hidden] !== undefined )
    onchange({type: document[hidden] ? "blur" : "focus"});
})();