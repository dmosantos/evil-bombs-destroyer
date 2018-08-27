function preload() {
    /*[
        'bonus-life.png',
        'bonus-multiplebullet.png',
        'bonus-speedbullet.png',
        'bonus-tribullet.png',
        'enemy-bomb-1.png',
        'enemy-bomb-2.png',
        'enemy-bomb-3.png',
        'enemy-bomb-4.png',
        'land-grass.png',
        'sky-clouds.png'
    ].forEach(function(image) {
        $.sprites[image.replace(/\..*$/g, '').replace(/-/g, '_')] = loadImage('images/' + image);
    });*/
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    homeScreen();
}

function draw() {
    clear();
    background($.states.background);

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
            if(millis() % 2000 < 17 && $.elements.Player)
                $.appendElement(new EnemyBomb());

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
    $.states.start = millis() / 1000;
    $.states.currentContext = 'homeScreen';

    $.appendElement(new HomeScreen());
}

// Gameplay
function gamePlay() {
    $.states.start = millis() / 1000;
    $.states.shooting = false;
    $.states.currentContext = 'gamePlay';
    $.states.points = 0;

    $.appendElement(new Ground());
    $.appendElement(new Placar());
    $.appendElement(new Player());
}

// Game Over
function gameOver() {
    $.states.start = millis() / 1000;
    $.states.shooting = false;
    $.states.currentContext = 'gameOver';

    Object.keys($.types.EnemyBomb).forEach(function(id) {
        $.types.EnemyBomb[id].dead = true;
    });

    Object.keys($.types.PlayerBullet).forEach(function(id) {
        $.types.PlayerBullet[id].dead = true;
    });

    $.appendElement(new GameOver());
}