/* SOUND */
function Sounds() {
	this.files = {
		music: {},
		sound: {}
	}

	this.config = {
		music: {
			setVolume: 1
		},
		sound: {
			setVolume: 1
		}
	}
}

Sounds.prototype.load = function(type, file) {
	this.files[type][file.replace(/\..*$/g, '').replace(/-/g, '_')] = loadSound('sounds/' + file);
}

Sounds.prototype.set = function(type, file, options) {
	var self = this;

	if(typeof options != 'undefined')
		Object.keys(options).forEach(function(option) {
			self.files[type][file][option](options[option]);
		});
}

Sounds.prototype.applyConfig = function() {
	var self = this;

	Object.keys(self.config).forEach(function(type) {
		Object.keys(self.files[type]).forEach(function(file) {
			self.set(type, file, self.config[type]);
		});
	});
}

Sounds.prototype.play = function(type, file, options) {
	if(typeof options != 'undefined')
		this.set(type, file, options);

	this.applyConfig();

	this.files[type][file].play();
}

Sounds.prototype.pause = function(type, file) {
	if(this.files[type][file].isPlaying())
		this.files[type][file].pause();
}

Sounds.prototype.stop = function(type, file) {
	if(this.files[type][file].isPlaying())
		this.files[type][file].stop();
}