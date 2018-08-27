function Animation(parent, config) {
	this.type = 'Animation';
    this.id = this.type + '_' + newId();;
    this.layer = 0;
    this.context = parent.context;
    this.parent = parent;

    this.dead = false;

	this.started = false;
	this.startedAt = null;
	this.startedFrame = null;
	//this.liveUpdate = config.liveUpdate === true;
	this.duration = config.duration;
	this.keyframes = config.keyframes;

	this.timeElapsed;
	this.framesElapsed;
	this.percElapsed;
	this.isRunning;

	$.appendElement(this);

	return this;
}

Animation.prototype._update = function() {
	this.timeElapsed = millis() - this.startedAt;
	this.framesElapsed = frameCount - this.startedFrame;
	this.percElapsed =  this.timeElapsed / this.duration;
	this.isRunning =  this.timeElapsed < this.duration;

	this.dead = !this.isRunning;
}

Animation.prototype._draw = function() {
	var self = this;

	// if(this.liveUpdate) {
	// 	Object.keys(self.keyframes).forEach(function(keyframe) {
	// 		if(self.percElapsed * 100 >= int(keyframe)) {
	// 			Object.keys(self.keyframes[keyframe]).forEach(function(param) {
	// 				self.keyframes[keyframe][param] = self.get(param);
	// 			});
	// 		}
	// 	});
	// }
}

Animation.prototype.start = function() {
	this.started = true;
	this.startedAt = millis();
	this.startedFrame = frameCount;

	return this;
}

Animation.prototype.get = function(param) {
	var self = this;
	var current;
	var next;
	var keys = Object.keys(self.keyframes);

	keys.forEach(function(keyframe, i) {
		if(self.percElapsed * 100 >= int(keyframe)) {
			current = keyframe;
			next = keys[i + 1];
		}
	});

	if(next) {
		var x1 = self.percElapsed - (current / 100);
		var x2 = (next / 100) - (current / 100);
		var x3 = x1 / x2;
		var x4 = (self.keyframes[next][param] - self.keyframes[current][param]) * x3;
		var x5 = x4 + self.keyframes[current][param];
	} else if(current) {
		x5 = self.keyframes[current][param];
	} else {

	}

	return x5;
}