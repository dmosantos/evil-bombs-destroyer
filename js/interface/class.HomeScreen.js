function HomeScreen() {
	Element.call(this);

	this.type = 'HomeScreen';
	this.id = this.type;

    this.record = $.data.get('record');
    this.recordName = $.data.get('recordName');

    $.events.on('click', this);
}

HomeScreen.prototype = new Element();

HomeScreen.prototype.update = function() {
	this.height = height;
	this.width = width;
}

HomeScreen.prototype.draw = function() {
	background(150 * noise(millis() / 1000), 150 * noise(millis() / 900), 150 * noise(millis() / 1100));

    fill(255);
    noStroke();

    textAlign(CENTER, CENTER);

    textSize(32);
    textStyle(BOLD);
    text('EVIL BOMBS DESTROYER', (width * 0.5) - 125, this.height * 0.25, 250);

    //if((millis() / 1000) - $.states.frames.start > 2) {
        textSize(18);
        textStyle(NORMAL);
        text(
            'Toque para iniciar' +
            (
                this.record
                    ? (
                        '\n\n\nRECORDE' + '\n' +
                        this.recordName + ': ' + String(this.record)
                    )
                    : ''
            )
        , 0, this.height * 0.55, this.width);
    //}

    textSize(14);
    textStyle(NORMAL);
    text('por Diego Marques', 0, this.height - 20, this.width);
}

HomeScreen.prototype.click = function() {
    $.events.off('click', this);
    this.dead = true;
    $.contexts.show('gamePlay');
}