var $;

function Core() {
	var self = this;

	// Config
	this.config = {
        baseColor: color(0),
        secondColor: color(255)
    }

	// States Control
	this.states = {
		start: 0,
		background: {
	        active: 'base',
	        get: {
	            base: {
	                topColor: color(156, 14, 55),
	                bottomColor: color(255, 236, 115)
	            },
	            light: {
	                topColor: color(215, 20, 76),
	                bottomColor: color(255)
	            }
	        }
	    },
	    firstEventType: null,
		shooting: false,
		currentContext: 'preload',
		points: 0,
		enemyMaxLife: 10
	}

	// Sounds
	this.sounds = new Sounds();

	// Data
	this.data = new LocalStorageData();

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