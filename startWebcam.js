var width = 300;
var height = 200;
var channels = {
  green: [],
  red: [],
  blue: []
};
var buffer = 512;
var DEBUG = true;
var LOCAL = false;

// query for webcam access and create video stream
function initVideoStream(document, callback) {
  if (DEBUG) console.log('DEBUG mode activated');
  if (LOCAL) console.log('LOCAL mode activated -- using local video file');

  var video = document.createElement("video");
  video.setAttribute("width", width);
  video.setAttribute("height", height);
  
  if (LOCAL) {
    video.src = './reference/pulse-test-small-ns.webm';
    video.loop = 'true';
    return callback(video);
  } else {
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream); 
        return callback(video);
      }, errorCallback);
    };
  }
};

// create canvas for drawing video stream
function initCanvas(document, video) {
  var canvas = document.getElementById("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  var canvasContext = canvas.getContext("2d");
  
  var overlay = document.getElementById("canvasOverlay");
  overlay.setAttribute("width", width);
  overlay.setAttribute("height", height);
  var overlayContext = overlay.getContext("2d");
  overlayContext.clearRect(0, 0, width, height);

  return {
    canvas: canvas,
    canvasContext: canvasContext,
    overlay: overlay,
    overlayContext: overlayContext
  };
};

function startCapture(video, canvas, headtracker) {
  video.play();
  headtracker.start(video);

  // ** set the framerate and draw the video the canvas at the desired fps ** 
  renderTimer = setInterval(function() {
    if (!video.paused) {
      // draw headtracker face
      canvas.overlayContext.clearRect(0,0,width,height);
      canvas.canvasContext.drawImage(video, 0, 0, width, height);
      
      if (DEBUG) {
        headtracker.draw(canvas.overlay);
        // draw rect
        var face = headtracker.getCurrentPosition();
        if (face) drawRect(face, canvas);
      }
    }
  }, Math.round(1000 / 15));

  return;
};

function configPause (video, headtracker) {
  var pause = document.getElementById("pause");

  pause.addEventListener("click", function() {
    if (!video.paused) {
      console.log('Pause');
      video.pause();
      headtracker.stop();
      pause.innerHTML = 'Start';
    } else {
      console.log('Start');
      video.play();
      headtracker.start(video);
      pause.innerHTML = 'Pause';
    }
  });

  return;
}

function errorCallback() {
  console.log('something went wrong');
}

function main(document) {
  initVideoStream(document, function (video) {
    // head tracker
    var headtracker = new clm.tracker();
    headtracker.init(pModel);

    var canvas = initCanvas(document, video);
    startCapture(video, canvas, headtracker);
    configPause(video, headtracker);
  });
}

window.onload = function() {
  main(document);
}
