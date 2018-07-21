var running;
var dtStart;
var elements;
var frame;

var points;
var $canvas;
var clientX;
var clientY;
var shooting;
var dtLastEnemy;
var newEnemyTimer;
var nivel;
var bonus;

var $points;
var $player;
var $playerLife;

var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 16);
    };

function random(from, to) {
    return Math.floor(Math.random() * to) + from;
}

window.onmousemove = function(e) {
    var e = e || window.event;  
    clientX = e.clientX;
    clientY = e.clientY;
}

window.onmousedown = function(e) {
    shooting = true;
    var e = e || window.event;  
    clientX = e.clientX;
    clientY = e.clientY;
}

window.onmouseup = function(e) {
    shooting = false;
}

window.ontouchmove = function(e) {
    var e = e || window.event;  
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
}

window.ontouchstart = function(e) {
    shooting = true;
    var e = e || window.event;  
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
}

window.ontouchend = function(e) {
    shooting = false;
}

function l(x){ console.log(x); }

(function() {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ("onfocusin" in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var v = "visible", h = "hidden",
        evtMap = {
            focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
        };

        evt = evt || window.event;
        if (evt.type in evtMap)
            document.body.className = evtMap[evt.type];
        else
            document.body.className = this[hidden] ? "hidden" : "visible";

        if(dtStart)
            running = document.body.className == "visible";
    }

    // set the initial state (but only if browser supports the Page Visibility API)
    if( document[hidden] !== undefined )
    onchange({type: document[hidden] ? "blur" : "focus"});
})();