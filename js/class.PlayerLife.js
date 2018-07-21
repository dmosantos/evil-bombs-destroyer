function PlayerLife() {
	Element.call(this);
	this.init();

	this.$.setAttribute('id', 'player-life');
    this.$.setAttribute('class', 'remover');

    this.$playerLifeBar = document.createElement("div");
    
    this.$playerLifeBar.setAttribute('id', 'player-life-bar');
    this.$playerLifeBar.setAttribute('class', 'remover');
    
    this.$.appendChild(this.$playerLifeBar);
    
    this.x = 5;
    this.y = 5;
    this.width = 10;
    this.height = 75;
}

PlayerLife.prototype = new Element();

PlayerLife.prototype.update = function() {
    this.height = $player.life * 100 / 10;
}

PlayerLife.prototype.render = function() {
    this.$playerLifeBar.style.height = this.height + '%';
}