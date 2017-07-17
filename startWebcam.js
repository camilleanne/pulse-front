var width = 300;
var height = 200;
var channels = {
  green: [],
  red: [],
  blue: []
};
var buffer = 512;

function initVideoStream(document, callback) {
  var video = document.createElement("video");
  video.setAttribute("width", width);
  video.setAttribute("height", height);

  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

  if (navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(function(stream){
      video.src = window.URL.createObjectURL(stream); 
      return callback(video);
    }, errorCallback);
  };
};

function initCanvas(document, video){
  var canvas = document.getElementById("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  var canvasContext = canvas.getContext("2d");
  
  var canvasOverlay = document.getElementById("canvasOverlay");
  canvasOverlay.setAttribute("width", width);
  canvasOverlay.setAttribute("height", height);
  var overlayContext = canvasOverlay.getContext("2d");
  overlayContext.clearRect(0, 0, width, height);

  return {
    canvas: canvas,
    canvasContext: canvasContext,
    canvasOverlay: canvasOverlay,
    overlayContext: overlayContext
  };
};

function startCapture(video, canvas, headtracker){
  video.play();
  headtracker.start(video);

  // ** set the framerate and draw the video the canvas at the desired fps ** 
  renderTimer = setInterval(function(){
      if (!video.paused) {
        // draw headtracker face
        canvas.overlayContext.clearRect(0,0,width,height);
        canvas.canvasContext.drawImage(video, 0, 0, width, height);
        headtracker.draw(canvas.canvasOverlay);

        // draw rect
        var face = headtracker.getCurrentPosition();
        if (face) drawRect(face, canvas);
      }
    }, Math.round(1000 / 1));

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

function drawRect (coordinates, canvas) {
  // canvas.overlayContext.clearRect(0,0,width,height);

  // these refer to the array coords of the eyebrows
  // as determined by the headtracker
  var right = 17;
  var left = 21;

  if (coordinates) {
    var w = coordinates[right][0] - coordinates[left][0];
    var center = [
      ((coordinates[right][0] + coordinates[left][0])/2) - 10,
      ((coordinates[right][1] + coordinates[left][1])/2) - 10
    ];

    canvas.overlayContext.strokeStyle = "#33CCFF";
    // this padding is a problem....
    canvas.overlayContext.strokeRect(center[0], center[1], 20, 20);

    var forehead = canvas.canvasContext.getImageData(center[0], center[1], 20, 20);
    var length = forehead.data.length;

    var sums = {
      green: 0,
      red: 0,
      blue: 0
    };

    for (i = 0; i < length; i+=4) {
      sums.red += forehead.data[i];
      sums.green += forehead.data[i + 1];
      sums.blue += forehead.data[i + 2];
    }

    // push the average of each channel to an array
    channels.red.push(sums.red/length/4);
    channels.green.push(sums.green/length/4);
    channels.blue.push(sums.blue/length/4);

    if (channels.green.length > buffer / 8) {
      console.log('ready to send');
    }
    // if the arrays of averages are longer than the buffer
    // drop the last value and move the window
    if (channels.green.length > buffer) {
      console.log('buffer full');
      channels.red.shift();
      channels.green.shift();
      channels.blue.shift();
    }
    console.log(channels.red.length)
  }

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

main(document);
