function BtnPowerUp() {
	Element.call(this);
    var self = this;

	this.type = 'BtnPowerUp';
	this.id = this.type;
	this.layer = 20;

	this.width = 30;
	this.height = 30;

    if($)
        $.events.on('click', this, {
            triggerOnPause: true,
            middleware: function() {
                return collidePointRect(mouseX, mouseY, self.x, self.y, self.width, self.height);
            }
        });
    
    this.label = '1';

	this.x = 10;
    if($)
	   this.y = height - 40;
}

BtnPowerUp.prototype = new Element();

BtnPowerUp.prototype.update = function() {
}

BtnPowerUp.prototype.draw = function() {
    l(this.type);
    noFill();
    strokeWeight(2);
    stroke($.config.secondColor);

    rect(this.x, this.y, this.width, this.height, 4);

    fill($.config.secondColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    //textFont(fontAwesome);
    //text(char(!$.states.pause ? 61516 : 61515), this.x + (this.width / 2), this.y + (this.height / 2) - 1);
    text(this.label, this.x + (this.width / 2), this.y + (this.height / 2) - 1);
}

/* Auto */
function BtnPowerUpAuto() {
    BtnPowerUp.call(this);
    
    this.x = 10;
    this.label = '1';
}

BtnPowerUpAuto.prototype = new BtnPowerUp();

BtnPowerUpAuto.prototype.click = function() {
    l('Auto');
}

/* Multi * /
function BtnPowerUpMulti() {
    BtnPowerUp.call(this);
    
    this.x = 40;
    this.label = '2';
}

BtnPowerUpMulti.prototype = new BtnPowerUp();

BtnPowerUpMulti.prototype.click = function() {
    l('Multi');
}

/* Precision * /
function BtnPowerUpPrecision() {
    BtnPowerUp.call(this);
    
    this.x = 80;
    this.label = '3';
}

BtnPowerUpPrecision.prototype = new BtnPowerUp();

BtnPowerUpPrecision.prototype.click = function() {
    l('Precision');
}

/* Bounce * /
function BtnPowerUpBounce() {
    BtnPowerUp.call(this);
    
    this.x = 120;
    this.label = '4';
}

BtnPowerUpBounce.prototype = new BtnPowerUp();

BtnPowerUpBounce.prototype.click = function() {
    l('bounce');
}*/