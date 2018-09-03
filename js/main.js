var fontAwesome;
var fontBase;

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
        ['sound', 'game-over.mp3'],
        ['sound', 'upgrade-ready.mp3'],
        ['sound', 'upgrade-level-up.mp3'],
        ['sound', 'upgrade-start.mp3']
    ].forEach(function(file) {
        $.sounds.load(file[0], file[1]);
    });

    fontAwesome = loadFont('fonts/FontAwesome.otf');
    fontBase = loadFont('fonts/RobotoMono-Bold.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    if($.data.get('mute'))
        mute();

    $.contexts.show('homeScreen');
}


function draw() {
    clear();
    background(255);

    if(!$.states.pause)
        $.states.frames.count++;
    else
        $.states.frames.gap++;

    setGradient(0, 0, width, height, $.states.background.get[$.states.background.active].topColor, $.states.background.get[$.states.background.active].bottomColor, 1);

    if(typeof $.by.contexts[$.by.contexts.current] != 'undefined') {
        Object.keys($.by.contexts[$.by.contexts.current]).forEach(function(layer) {
            Object.keys($.by.contexts[$.by.contexts.current][layer]).forEach(function(id) {
                if(!$.states.pause)
                    $.by.contexts[$.by.contexts.current][layer][id]._update();
                push();
                textFont(fontBase);
                $.by.contexts[$.by.contexts.current][layer][id]._draw();
                pop();
            });
        });

        Object.keys($.elements).forEach(function(id) {
            if($.elements[id].dead) {
                delete $.by.contexts[$.elements[id].context][$.elements[id].layer][id];
                delete $.by.types[$.elements[id].type][id];
                delete $.elements[id];
            }
        });
    }

    if(!$.states.pause)
        $.contexts.update();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(e) {
    $.events.trigger('mouseMoved');
    fire(e.type);
}

function touchStarted(e) {
    $.events.trigger('mouseMoved');
    fire(e.type);
}

function mouseMoved() {
    $.events.trigger('mouseMoved');
}

function touchMoved() {
    $.events.trigger('mouseMoved');
}

function keyPressed() {
    $.events.trigger('keyPressed', keyCode);
}

function keyReleased() {
    $.events.trigger('keyReleased', keyCode);
}

function fire(type) {
    if(!$.states.firstEventType)
        $.states.firstEventType = type;

    if($.states.firstEventType == type)
        $.events.trigger('click');
}

// Foco na janela
if (window.addEventListener)
    window.addEventListener('load', onLoad, false);
else if (window.attachEvent)
    window.attachEvent('onload', onLoad);

function onLoad() {
    //l('onLoad');
    document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available
//
function onDeviceReady() {
    //l('onDeviceReady');
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}

function onPause() {
    //l('onPause');
    noLoop();
    mute();
}

function onResume() {
    //l('onResume');
    loop();
    if(!$.data.get('mute'))
        unmute();
}