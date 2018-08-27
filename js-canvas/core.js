function Core() {
	var self = this;

	// States Control
	this.states = {
		start: 0,
		background: 0,
		shooting: false,
		currentContext: 'preload',
		points: 0
	}

	// Elements lists
	this.elements = {};
	this.types = {};
	this.contexts = {};
}

Core.prototype.appendElement = function(element) {

	if(typeof $.types[element.type] == 'undefined')
		$.types[element.type] = {}

	if(typeof $.contexts[element.context] == 'undefined')
		$.contexts[element.context] = {}

	if(typeof $.contexts[element.context][element.layer] == 'undefined')
		$.contexts[element.context][element.layer] = {}

	$.elements[element.id] = element;
	$.types[element.type][element.id] = $.elements[element.id];
	$.contexts[element.context][element.layer][element.id] = $.elements[element.id];
}

Core.prototype.get = function(id) {
	return $.elements[element.id];
}

var $ = new Core();

/* HELPERS */
function newId() {
	return String(parseInt(random(1000000000, 9999999999))) + '_' + String(parseInt(millis()));
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