var fontAwesome;

function preload() {
    $ = new Core();

    soundFormats('mp3');

    [
        ['music', 'music-is-this-love.mp3'],
        ['sound', 'explosion-1.mp3'],
        ['sound', 'explosion-2.mp3'],
        ['sound', 'explosion-3.mp3'],
        ['sound', 'explosion-4.mp3'],
        ['sound', 'alarm.mp3'],
        ['sound', 'seek-and-destroy.mp3'],
        ['sound', 'shoot.mp3'],
        ['sound', 'hit.mp3'],
        ['sound', 'game-over.mp3']
    ].forEach(function(file) {
        $.sounds.load(file[0], file[1]);
    });

    fontAwesome = loadFont('fonts/FontAwesome.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    if($.data.get('mute'))
        mute();

    homeScreen();
}


function draw() {
    clear();
    background(255);

    setGradient(0, 0, width, height, $.states.background.get[$.states.background.active].topColor, $.states.background.get[$.states.background.active].bottomColor, 1);

    if(typeof $.contexts[$.states.currentContext] != 'undefined') {
        Object.keys($.contexts[$.states.currentContext]).forEach(function(layer) {
            Object.keys($.contexts[$.states.currentContext][layer]).forEach(function(id) {
                $.contexts[$.states.currentContext][layer][id]._update();
                push();
                $.contexts[$.states.currentContext][layer][id]._draw();
                pop();
            });
        });

        Object.keys($.elements).forEach(function(id) {
            if($.elements[id].dead) {
                delete $.contexts[$.elements[id].context][$.elements[id].layer][id];
                delete $.types[$.elements[id].type][id];
                delete $.elements[id];
            }
        });
    }

    switch($.states.currentContext) {
        case 'gamePlay':
            if(frameCount % 120 == 0 && $.elements.Player)
                $.appendElement(new EnemyBomb());

            var newEnemyMaxLife = 10 + floor((frameCount - $.states.start) / 1000);
            if(newEnemyMaxLife != $.states.enemyMaxLife) {
                $.states.enemyMaxLife = newEnemyMaxLife;
                $.sounds.play('sound', 'alarm');
                
                var enemyBomb = new EnemyBomb2();
                enemyBomb.life = newEnemyMaxLife;
                $.appendElement(enemyBomb);
            }

            if(!$.elements.Player)
                gameOver();
            break;

        case 'homeScreen':
        case 'gameOver':
            if($.states.shooting == true) {
                $.states.shooting == false;
                gamePlay();
            }
            break;
    }

    // Tests
    // fill(30);
    // noStroke();
    // beginShape();
    //     vertex(0, 0);
    //     vertex(150, 0);
    //     vertex(150, 150);
    //     vertex(0, 150);
    //     beginContour();
    //         vertex(50, 50);
    //         vertex(50, 100);
    //         vertex(100, 100);
    //         vertex(100, 50);
    //     endContour();
    // endShape();
    // pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(e) {
    fire(e.type);
}

function touchStarted(e) {
    fire(e.type);
}

function fire(type) {
    if(!$.states.firstEventType)
        $.states.firstEventType = type;

    if($.states.firstEventType == type) {
        if($.states.currentContext != 'gameOver' || frameCount - $.states.start > 2)
            $.states.shooting = true;

        if($.elements.BtnSound)
            $.elements.BtnSound._checkClick();
    }
}

/* Contextos */

// Tela inicial
function homeScreen() {
    $.states.start = frameCount;
    $.states.currentContext = 'homeScreen';

    $.sounds.play('music', 'music_is_this_love', {
        setLoop: true
    });

    $.appendElement(new HomeScreen());
}

// Gameplay
function gamePlay() {
    $.states.start = frameCount;
    $.states.shooting = false;
    $.states.currentContext = 'gamePlay';
    $.states.points = 0;
    $.states.enemyMaxLife = 10;

    //$.sounds.stop('music', 'music_is_this_love');
    //$.sounds.stop('music', 'music_eternity');
    //$.sounds.play('music', 'music_eternity', {
    //    setLoop: true
    //});
    $.sounds.play('sound', 'seek_and_destroy');

    $.appendElement(new Ground());
    $.appendElement(new Placar());
    $.appendElement(new BtnSound());
    $.appendElement(new Player());
}

// Game Over
function gameOver() {
    $.states.start = millis() / 1000;
    $.states.shooting = false;
    $.states.currentContext = 'gameOver';

    $.sounds.play('sound', 'game_over');

    Object.keys($.contexts.gamePlay).forEach(function(layer) {
        Object.keys($.contexts.gamePlay[layer]).forEach(function(id) {
            $.contexts.gamePlay[layer][id].dead = true;
        });
    });

    $.appendElement(new GameOver());
}

// Foco na janela
window.onload = function() {  
    //only fired once when app is opened
    document.addEventListener("deviceready", focusin, false);
    //re-open app when brought to foreground
    document.addEventListener("resume", focusin, false);
    //trigger when app is sent to background
    document.addEventListener("pause", focusout, false);

    function focusin() {
        loop();
        if(!$.data.get('mute'))
            unmute();
    }

    function focusout() {
        noLoop();
        mute();
    }
}