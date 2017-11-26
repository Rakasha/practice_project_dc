var CanvasEditor = function (canvas) {
    console.log('Init canvas editor');
    this.canvas = canvas;
    // Save the cursor position of the mouse-down event
    this.startPoint = null;
    this.setEventListeners();
};
CanvasEditor.prototype.loadImg = function (img) {
    this.img = img;
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    this.canvas.getContext('2d').drawImage(img, 0, 0);
};
CanvasEditor.prototype.reload = function () {
    if (! this.img) {
        alert('set img obj first !')
    }
    this.loadImg(this.img);
};
CanvasEditor.prototype.maskCanvasArea = function (x, y, w, h) {
    var ctx = this.canvas.getContext('2d');
    var imgData = ctx.getImageData(x, y, w, h);
    var blurredImgData = blurImgData(imgData);
    ctx.putImageData(blurredImgData, x, y);
};

CanvasEditor.prototype.getCursorPositionByEv = function (event) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
};
CanvasEditor.prototype.setEventListeners = function () {
    var self = this;
    self.canvas.onmousedown = function (ev) {
        self.startPoint = self.getCursorPositionByEv(ev);
    };
    self.canvas.onmouseup = function (ev) {
        self.reload();
        var startPoint = self.startPoint;
        var endPoint = self.getCursorPositionByEv(ev);
        var w = endPoint.x - startPoint.x;
        var h = endPoint.y - startPoint.y;
        self.maskCanvasArea(startPoint.x, startPoint.y, w, h);
        self.startPoint = null;
    };
    self.canvas.onmousemove = function (ev) {
        if (self.startPoint !== null) {
            self.reload();
            var ctx = self.canvas.getContext('2d');
            var currentPos = self.getCursorPositionByEv(ev);
            var width = currentPos.x - self.startPoint.x;
            var height = currentPos.y - self.startPoint.y;
            ctx.strokeRect(self.startPoint.x, self.startPoint.y, width, height);
        }
    };
};

function init_editor () {
    var myImg = document.getElementById('myImg');
    var myCanvas = document.getElementById('myCanvas');
    var editor = new CanvasEditor(myCanvas);
    editor.loadImg(myImg);
}

function blurImgData (imgData) {
    return Filters.gaussianBlur(imgData, 100.0);
}