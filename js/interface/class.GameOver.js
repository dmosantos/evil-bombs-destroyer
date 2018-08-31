function GameOver() {
	Element.call(this);
    var self = this;

	this.type = 'GameOver';
	this.id = this.type;

    this.record = $.data.get('record');
    this.recordName = $.data.get('recordName');
    this.showRecord = true;

    if(!this.record || $.states.points > this.record) {
        this.showRecord = false;
        setTimeout(function() {
            self.record = $.states.points;
            self.recordName = (prompt('NOVO RECORDE!\n\nSeu nome:') || 'Anônimo').substr(0, 20);
            $.data.set('record', self.record);
            $.data.set('recordName', self.recordName);
            self.showRecord = true;
        }, 0);
    }

    $.events.on('click', this);
}

GameOver.prototype = new Element();

GameOver.prototype.update = function() {
	this.height = height;
	this.width = width;
}

GameOver.prototype.draw = function() {
	background(150 * noise(millis() / 1000), 150 * noise(millis() / 900), 150 * noise(millis() / 1100));
    
    fill(255);
    noStroke();

    textAlign(CENTER, CENTER);

    textSize(32);
    textStyle(BOLD);
    text('GAME OVER', (width * 0.5) - 125, this.height * 0.25, 250);

    textSize(18);
    textStyle(NORMAL);
    text(
        'PONTOS: ' + String($.states.points) + '\n\n\n' +
        (
            this.showRecord
                ? (
                    ($.states.points >= this.record ? 'NOVO RECORDE!' : 'RECORDE') + '\n' +
                    this.recordName + ': ' + String(this.record)
                )
                : ''
        ) +
        ($.states.frames.count - $.states.frames.start > 120 ? '\n\n\nTOQUE PARA REINICIAR' : '')
    , 0, this.height * 0.45, this.width);

    textSize(14);
    text('por Diego Marques', 0, this.height - 20, this.width);
}

GameOver.prototype.click = function() {
    if($.states.frames.count - $.states.frames.start > 120) {
        $.events.off('click', this);
        $.contexts.show('gamePlay');
    }
}