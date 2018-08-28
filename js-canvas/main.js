function preload() {
    $ = new Core();

    soundFormats('mp3', 'wav', 'ogg');

    [
        'music-is-this-love.mp3',
        'music-eternity.mp3',
        'explosion-1.wav',
        'explosion-2.wav',
        'explosion-3.wav',
        'explosion-4.wav',
        'alarm.wav',
        'seek-and-destroy.wav',
        'shoot.ogg',
        'hit.wav',
        'game-over.wav'
    ].forEach(function(sound) {
        $.sounds[sound.replace(/\..*$/g, '').replace(/-/g, '_')] = loadSound('sounds/' + sound);
    });
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

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
                $.play('alarm', 0.1);
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

function mousePressed() {
    fire();
}

function touchStarted() {
    fire();
}

function fire() {
    if($.states.currentContext != 'gameOver' || (millis() / 1000) - $.states.start > 2)
        $.states.shooting = true;
}

/* Contextos */

// Tela inicial
function homeScreen() {
    $.states.start = frameCount;
    $.states.currentContext = 'homeScreen';

    $.sounds['music_is_this_love'].setLoop(true);
    $.play('music_is_this_love', 0.7);

    $.appendElement(new HomeScreen());
}

// Gameplay
function gamePlay() {
    $.states.start = frameCount;
    $.states.shooting = false;
    $.states.currentContext = 'gamePlay';
    $.states.points = 0;
    $.states.enemyMaxLife = 10;

    $.stop('music_is_this_love');
    $.stop('music_eternity', 0.7);
    $.play('music_eternity', 0.7);
    $.play('seek_and_destroy', 0.7);

    $.appendElement(new Ground());
    $.appendElement(new Placar());
    $.appendElement(new Player());
}

// Game Over
function gameOver() {
    $.states.start = frameCount;
    $.states.shooting = false;
    $.states.currentContext = 'gameOver';

    $.play('game_over');

    if($.types.EnemyBomb) {
        Object.keys($.types.EnemyBomb).forEach(function(id) {
            $.types.EnemyBomb[id].dead = true;
        });
    }

    if($.types.PlayerBullet) {
        Object.keys($.types.PlayerBullet).forEach(function(id) {
            $.types.PlayerBullet[id].dead = true;
        });
    }

    $.appendElement(new GameOver());
}
