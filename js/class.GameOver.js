function GameOver() {
	Element.call(this);

	this.type = 'GameOver';
	this.id = this.type;
}

GameOver.prototype = new Element();

GameOver.prototype.update = function() {
	this.height = windowHeight;
	this.width = windowWidth;
}

GameOver.prototype.draw = function() {
	background(150 * noise(millis() / 1000), 150 * noise(millis() / 900), 150 * noise(millis() / 1100));

    fill(255);
    noStroke();

    textAlign(CENTER, CENTER);

    textSize(32);
    textStyle(BOLD);
    text('GAME OVER', (windowWidth * 0.5) - 125, this.height * 0.25, 250);

    textSize(18);
    textStyle(NORMAL);
    text('Sua pontuação: ' + $.states.points, 0, this.height * 0.45, this.width);
    
    if((millis() / 1000) - $.states.start > 2)
        text('Toque para reiniciar', 0, this.height * 0.55, this.width);

    textSize(14);
    text('por Diego Marques', 0, this.height - 20, this.width);
}