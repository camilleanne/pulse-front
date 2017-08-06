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

    if (DEBUG) {
      canvas.overlayContext.strokeStyle = "#33CCFF";
      // this padding is a problem....
      canvas.overlayContext.strokeRect(center[0], center[1], 20, 20);
    }

    var forehead = canvas.canvasContext.getImageData(center[0], center[1], 20, 20);
    var length = forehead.data.length;

    var sums = {
      green: 0,
      red: 0,
      blue: 0
    };

    for (i = 0; i < length; i += 4) {
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
  }
}