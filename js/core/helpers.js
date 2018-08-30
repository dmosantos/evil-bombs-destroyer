/* HELPERS */
function mute() {
	$.sounds.config.sound.setVolume = 0;
	$.sounds.config.music.setVolume = 0;
	$.sounds.applyConfig();
}

function unmute() {
	$.sounds.config.sound.setVolume = 1;
	$.sounds.config.music.setVolume = 1;
	$.sounds.applyConfig();
}

function newId() {
	return typeof random != 'undefined' ? String(parseInt(random(1000000000, 9999999999))) + '_' + String(parseInt(millis())) : String((new Date()).getMilliseconds());
}

function getPoint(mx, my, cx, cy, angle) {

    var x, y, dist, diffX, diffY, ca, na;

    /// get distance from center to point
    diffX = cx - mx;
    diffY = cy - my;
    dist = Math.sqrt(diffX * diffX + diffY * diffY);

    /// find angle from pivot to corner
    ca = Math.atan2(diffY, diffX) * 180 / Math.PI;

    /// get new angle based on old + current delta angle
    na = ((ca + angle) % 360) * Math.PI / 180;

    /// get new x and y and round it off to integer
    x = (mx + dist * Math.cos(na) + 0.5)|0;
    y = (my + dist * Math.sin(na) + 0.5)|0;

    return {x:x, y:y};
}

function angleBetween(p1x, p1y, p2x, p2y) {
	return atan2(p2y - p1y, p2x - p1x);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis == 1) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == 2) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

var EasingFunctions = {
	linear: function (t) { return t },
	easeInQuad: function (t) { return t*t },
	easeOutQuad: function (t) { return t*(2-t) },
	easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
	easeInCubic: function (t) { return t*t*t },
	easeOutCubic: function (t) { return (--t)*t*t+1 },
	easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
	easeInQuart: function (t) { return t*t*t*t },
	easeOutQuart: function (t) { return 1-(--t)*t*t*t },
	easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
	easeInQuint: function (t) { return t*t*t*t*t },
	easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
	easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}

function l(x) {
    console.log(x);
}
function t(x) {
    console.table(x);
}
function p(color) {
	fill(255);
	stroke(0);

    arc(0, 0, 10, 10, 360, 0, CHORD);
}