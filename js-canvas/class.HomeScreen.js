function HomeScreen() {
	Element.call(this);

	this.type = 'HomeScreen';
	this.id = this.type;

}

HomeScreen.prototype = new Element();

HomeScreen.prototype.update = function() {
	this.height = windowHeight;
	this.width = windowWidth;
}

HomeScreen.prototype.draw = function() {
	background(150 * noise(millis() / 1000), 150 * noise(millis() / 900), 150 * noise(millis() / 1100));

    fill(255);
    noStroke();

    textAlign(CENTER, CENTER);

    textSize(32);
    textStyle(BOLD);
    text('EVIL BOMBS DESTROYER', (windowWidth * 0.5) - 125, this.height * 0.25, 250);

    if((millis() / 1000) - $.states.start > 2) {
        textSize(18);
        textStyle(NORMAL);
        text('Toque para iniciar', 0, this.height * 0.55, this.width);
    }

    textSize(14);
    textStyle(NORMAL);
    text('por Diego Marques', 0, this.height - 20, this.width);
}