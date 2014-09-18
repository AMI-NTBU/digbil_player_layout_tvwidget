var videoElement = el.select("#tvElement");
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
var lastStream;

var widget = {
// MediaStreamTrack.getSources(function(sources){ })
    _playStream : function() {
        /* if a stream is alife dont interrupt */
        if (!navigator.getUserMedia || lastStream || lastStream.ended)
            return;

        navigator.getUserMedia({
            video : true
        }, function(stream) {
            lastStream = stream;
            videoElement.src = URL.createObjectURL(stream);
        }, function(e) {
            console.error(' -- tvwidget: ' + e);
            console.error(e);
        });
    },
    update : function(cfg) {
        if (navigator.getUserMedia)
            widget._playStream();
        else
            console.error(' -- tvwidget: TV stream not supported in your browser/device');
    }
};

setInterval(widget._playStream, 30000);

if (el.onResize)
    el.onResize(function(event) {
        widget.update();
    });

function suffixScript() {
    el.setWidget(widget);
}