
//
// utils
//
function log(s) {
	console.log(s);
}

function delayRun(view, delayTime, func) {
	var totalTime = 0;
	var tempView = new ViewContainer(view.getRender());
	tempView.doUpdate = function(dt) {
		totalTime += dt;
		if (totalTime >= delayTime) {
			tempView.doUpdate = function(dt){};
			if (func) {
				func();
			}
			tempView.removeFromParent();
		}
	}
	view.addChild(tempView);
}

//
// kernel
//
function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Size(width, height) {
	this.width = width;
	this.height = height;
}

function Rect(position, size) {
	this.position = position;
	this.size = size;

	this.containPoint = function(point) {
		var pt = this.position || new Point(0, 0);
		var sz = this.size || new Size(0, 0);
		if ((pt.x < point.x) && (point.x < pt.x + size.width) &&
				(pt.y < point.y) && (point.y < pt.y + size.height))
		{
			return true;
		}
		return false;
	}
}

function ViewContainer(render) {
	this.name = "";
	this.render = render;
	this.size = new Size(0, 0);
	this.position = new Point(0, 0);
	this.scale = new Point(1, 1);
	this.isClippingEnabled = false;
	this.clippingRect = new Rect(new Point(0, 0), new Size(0, 0));
	this.children = new Array();
	this.parent = null;
	this.isTouchEnabled = false;
	this.isTouched = false;

	this.setName = function(name) {
		this.name = name;
	}
	this.getName = function() {
		return this.name;
	}
	this.setWidth = function(width) {
		this.size.width = width;
	}
	this.getWidth = function() {
		return this.size.width;
	}
	this.setHeight = function(height) {
		this.size.height = height;
	}
	this.getHeight = function() {
		return this.size.height;
	}
	this.setPositionX = function(x) {
		this.position.x = x;
	}
	this.getPositionX = function() {
		return this.position.x;
	}
	this.setPositionY = function(y) {
		this.position.y = y;
	}
	this.getPositionY = function() {
		return this.position.y;
	}
	this.setScaleX = function(sx) {
		this.scale.x = sx;
	}
	this.getScaleX = function() {
		return this.scale.x;
	}
	this.setScaleY = function(sy) {
		this.scale.y = sy;
	}
	this.getScaleY = function() {
		return this.scale.y;
	}
	this.setClippingEnabled = function(isEnabled) {
		this.isClippingEnabled = isEnabled;
	}
	this.getClippingEnabled = function() {
		return this.isClippingEnabled;
	}
	this.setClippingRect = function(rect) {
		this.clippingRect = rect;
	}
	this.getClippingRect = function() {
		return this.clippingRect;
	}
	this.addChild = function(child) {
		this.children.push(child);
		child.setParent(this);
	}
	this.getChild = function(name) {
		if (name == "") {
			return null;
		}

		for (var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			if (child.getName() == name) {
				return child;
			}
		}
		return null;
	}
	this.removeChild = function(child) {
		if (child == null) {
			return;
		}
		
		for (var i = 0; i < this.children.length; i++) {
			if (this.children[i] == child) {
				child.setParent(null);
				this.children.splice(i, 1);
				break;
			}
		}
	}
	this.removeChildByName = function(name) {
		if (name == "") {
			return;
		}

		for (var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			if (child.getName() == name) {
				child.setParent(null);
				this.children.splice(i, 1);
				break;
			}
		}
	}
	this.removeFromParent = function() {	
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}
	this.setParent = function(parent) {
		this.parent = parent;
	}
	this.getParent = function() {
		return this.parent;
	}
	this.setTouchEnabled = function(isEnabled) {
		this.isTouchEnabled = isEnabled;
	}
	this.getTouchEnabled = function() {
		return this.isTouchEnabled;
	}
	this.getRender = function() {
		return this.render;
	}
	this.update = function(dt) {
		this.doUpdate(dt);
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].update(dt);
		}
	}
	this.doUpdate = function(dt) {
		//
	}
	this.draw = function() {
		var sx = this.getScaleX();
		var sy = this.getScaleY();
		this.render.scale(sx, sy);
		if (this.isClippingEnabled) {
			this.render.save();

			var r = this.clippingRect;
			this.render.rect(r.position.x, r.position.y, r.size.width, r.size.height);
			this.render.clip();
		}

		//
		this.doDraw();
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].draw();
		}

		//
		if (this.isClippingEnabled) {
			this.render.restore();
		}
		this.render.scale(1 / sx, 1 / sy);
	}
	this.doDraw = function() {
		//
	}
	this.onTouchBegan = function(event) {
		this.isTouched = false;
		for (var i = (this.children.length - 1); i >= 0; i--) {
			var child = this.children[i];
			if (child.onTouchBegan(event)) {
				return true;
			}
		}

		if (this.isTouchEnabled && this.containTouch(event)) {
			this.doTouchBegan(event);
			this.isTouched = true;
		}
		return this.isTouched;
	}
	this.doTouchBegan = function(event) {
		//
	}
	this.onTouchMoved = function(event) {
		if (this.isTouched) {
			this.doTouchMoved(event);
		} else {
			for (var i = (this.children.length - 1); i >= 0; i--) {
				this.children[i].onTouchMoved(event);
			}
		}
	}
	this.doTouchMoved = function(event) {
		//
	}
	this.onTouchEnded = function(event) {
		if (this.isTouched) {
			this.isTouched = false;
			this.doTouchEnded(event);
		} else {
			for (var i = (this.children.length - 1); i >= 0; i--) {
				this.children[i].onTouchEnded(event);
			}
		}
	}
	this.doTouchEnded = function(event) {
		//
	}
	this.containTouch = function(event) {
		var rect = new Rect(this.position, this.size);
		return rect.containPoint(new Point(event.layerX, event.layerY));
	}
}

function ImageView(render, imageName) {
	ViewContainer.call(this, render);
	this.realImage = imageName;
	this.image = "img/" + imageName;

	this.setImage = function(imageName) {
		this.realImage = imageName;
		this.image = "img/" + imageName;
	}

	this.getImage = function() {
		return this.realImage;
	}

	this.doDraw = function() {
		var img = new Image();
		img.src = this.image;

		var x = this.getPositionX();
		var y = this.getPositionY();
		var w = this.getWidth();
		var h = this.getHeight();
		if (w > 0 && h > 0) {
			this.render.drawImage(img, x, y, w, h);
		} else {
			this.render.drawImage(img, x, y);
		}
	}
}

function TextView(render, txt) {
	ViewContainer.call(this, render);
	this.txt = txt;
	this.font = render.font;
	this.fillStyle = render.fillStyle;

	this.setText = function(txt) {
		this.txt = txt;
	}
	this.setFont = function(font) {
		this.font = font;
	}
	this.setStyle = function(style) {
		this.fillStyle = style;
	}
	this.doDraw = function() {
		var defaultFont = this.render.font;
		var defaultStyle = this.render.fillStyle;

		var x = this.getPositionX();
		var y = this.getPositionY();
		this.render.font = this.font || defaultFont;
		this.render.fillStyle = this.fillStyle || defaultStyle; 
		this.render.fillText(this.txt, x, y);

		this.render.font = defaultFont;
		this.render.fillStyle = defaultStyle;
	}
}

function ButtonView(render, normalImage, selectImage, disableImage) {
	ViewContainer.call(this, render);
	this.normalImage = "img/" + normalImage;
	if (selectImage != null) {
		this.selectImage = "img/" + selectImage;
		if (disableImage != null) {
			this.disableImage = "img/" + disableImage;
		} else {
			this.disableImage = this.normalImage;
		}
	} else {
		this.selectImage = this.normalImage;
		this.disableImage = this.normalImage;
	}
	this.currentImage = this.normalImage;
	this.touchBeganHandler = null;
	this.touchEndedHandler = null;

	this.setTouchEnabled = function(isEnabled) {
		this.isTouchEnabled = isEnabled;
		if (isEnabled) {
			this.currentImage = this.normalImage;
		} else {
			this.currentImage = this.disableImage;
		}
	}
	this.setTouchBeganHandler = function(handler) {
		this.touchBeganHandler = handler;
	}
	this.setTouchEndedHandler = function(handler) {
		this.touchEndedHandler = handler;
	}
	this.doDraw = function() {
		var img = new Image();
		img.src = this.currentImage;

		var x = this.getPositionX();
		var y = this.getPositionY();
		var w = this.getWidth();
		var h = this.getHeight();
		if (w > 0 && h > 0) {
			this.render.drawImage(img, x, y, w, h);
		} else {
			this.render.drawImage(img, x, y);
		}
	}
	this.doTouchBegan = function(event) {
		this.currentImage = this.selectImage;
		if (this.touchBeganHandler != null) {
			this.touchBeganHandler();
		}
	}
	this.doTouchEnded = function(event) {
		this.currentImage = this.normalImage;
		if (this.containTouch(event)) {
			if (this.touchEndedHandler != null) {
				this.touchEndedHandler();
			}
		}
	}
}

function Stage(render) {
	ViewContainer.call(this, render);
}

function World(width, height, interval) {
	interval = interval || 0.05;
	var mlInterval = interval * 1000;
	this.size = new Size(width, height);
	this.render = document.getElementById('myCanvas').getContext('2d'); 
	this.stage = new Stage(this.render);

	var self = this;
	document.onmousedown = function(event) {
		self.stage.onTouchBegan(event);
	}
	document.onmousemove = function(event) {
		self.stage.onTouchMoved(event);
	}
	document.onmouseup = function(event) {
		self.stage.onTouchEnded(event);
	}

	this.update = function(dt) {
		this.stage.update(dt);

		this.render.clearRect(0, 0, this.size.width, this.size.height);
		this.stage.draw();
	}
	this.run = function() {
		var onTick = function() {
			self.update(interval);
			window.setTimeout(onTick, mlInterval);
		}
		window.setTimeout(onTick, mlInterval);
	}
	this.run();
}

