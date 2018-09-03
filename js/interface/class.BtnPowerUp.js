function BtnPowerUp() {
	Element.call(this);
    var self = this;

	this.type = 'BtnPowerUp';
	this.id = this.type + '_' + newId();
	this.layer = 20;

    if($) {
    	this.width = 49;
    	this.height = 50;
    	this.x = 0;
        this.y = height - 50;

        $.events.on('click', this, {
            middleware: function() {
                return collidePointRect(mouseX, mouseY, self.x, self.y, self.width, self.height);
            }
        });
    }
    
    this.name = null;
    this.upgrade = {};
}

BtnPowerUp.prototype = new Element();

BtnPowerUp.prototype.update = function() {
    $.upgrades.update(this.name);
}

BtnPowerUp.prototype.draw = function() {
    var self = this;

    noFill();
    strokeWeight(1);
    stroke($.config.secondColor, 50);

    line(this.x + this.width, this.y, this.x + this.width, this.y + this.height);

    fill($.config.secondColor, this.upgrade.enable ? 255 : this.upgrade.level ? 180 : 100);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont(fontAwesome);

    // Icon
    textSize(18);
    text(char(this.upgrade.label), this.x + (this.width / 2), this.y + (this.height * 0.55));

    // level
    textSize(8);
    text([1, 2, 3, 4, 5].reduce(function(r, i) { return i <= self.upgrade.level ? r + char(61445) : r }, ''), this.x + (this.width / 2), this.y + (this.height * 0.2));

    // Progress Bar XP
    rect(this.x, this.y, this.width * (this.upgrade.xp / this.upgrade.nextLevel[this.upgrade.level]), 5);

    // Progress Bar Energy
    rect(this.x, this.y + this.height - 5, this.width * (this.upgrade.enable ? this.upgrade.active ? 1 - (($.states.frames.count - this.upgrade.start) / this.upgrade.duration[this.upgrade.level]) : 1 : (this.upgrade.energy / this.upgrade.full[this.upgrade.level])), 5);

    // Ready label
    if(this.upgrade.enable && !this.upgrade.active) {
        rect(this.x, this.y + this.height - 10, this.width, 10);
        fill($.config.baseColor);
        textFont(fontBase);
        textStyle(BOLD);
        textSize(14);
        text('ready', this.x + (this.width / 2), this.y + this.height - 8);
    }
}

BtnPowerUp.prototype.click = function() {
    $.upgrades.activate(this.name);
}

/* Auto */
function BtnPowerUpAuto() {
    BtnPowerUp.call(this);
    
    this.x = 0;
    this.name = 'auto';
    this.upgrade = $.upgrades[this.name];
}

BtnPowerUpAuto.prototype = new BtnPowerUp();

/* Multi */
function BtnPowerUpMulti() {
    BtnPowerUp.call(this);
    
    this.x = 50;
    this.name = 'multi';
    this.upgrade = $.upgrades[this.name];
}

BtnPowerUpMulti.prototype = new BtnPowerUp();

/* Precision */
function BtnPowerUpPrecision() {
    BtnPowerUp.call(this);
    
    this.x = 100;
    this.name = 'precision';
    this.upgrade = $.upgrades[this.name];
}

BtnPowerUpPrecision.prototype = new BtnPowerUp();

/* Bounce */
function BtnPowerUpBounce() {
    BtnPowerUp.call(this);
    
    this.x = 150;
    this.name = 'bounce';
    this.upgrade = $.upgrades[this.name];
}

BtnPowerUpBounce.prototype = new BtnPowerUp();

/* Missiles */
function BtnPowerUpMissiles() {
    BtnPowerUp.call(this);
    
    this.x = 200;
    this.name = 'missiles';
    this.upgrade = $.upgrades[this.name];
}

BtnPowerUpMissiles.prototype = new BtnPowerUp();