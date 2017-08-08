function drawRect (coordinates, canvas) {
  // canvas.overlayContext.clearRect(0,0,width,height);

  if (coordinates) {
    // these refer to the array coords of the relevant facial points
    // as determined by the headtracker
    var leftcheek = [0, 1, 2, 3, 4, 5, 44, 35, 25, 65, 26, 66, 23, 19, 0];
    var rightcheek = [14, 13, 12, 11, 10, 9, 50, 39, 30, 69, 31, 70, 28, 15, 14];
    var foreheadBottom = [19, 20, 21, 22, 18, 17, 16, 15];
    var foreheadTop = [16, 17, 21, 20];
    var chinDistance = coordinates[7][1] - coordinates[53][1];

    if (DEBUG) {
      canvas.overlayContext.strokeStyle = "#00fbff";
      canvas.overlayContext.fillStyle = "#00fbff";

      // LEFT CHEEK
      canvas.overlayContext.beginPath();
      for (var i = 0; i < leftcheek.length; i ++) {
        var coords = coordinates[leftcheek[i]];
        canvas.overlayContext.lineTo(coords[0], coords[1])
      }
      canvas.overlayContext.closePath();
      canvas.overlayContext.fill();

      // RIGHT CHEEK
      canvas.overlayContext.beginPath();
      for (var i = 0; i < rightcheek.length; i ++) {
        var coords = coordinates[rightcheek[i]];
        canvas.overlayContext.lineTo(coords[0], coords[1])
      }
      canvas.overlayContext.closePath();
      canvas.overlayContext.fill();

      // FOREHEAD
      canvas.overlayContext.beginPath();
      for (var i = 0; i < foreheadBottom.length; i ++) {
        var coords = coordinates[foreheadBottom[i]];
        canvas.overlayContext.lineTo(coords[0], coords[1]);
      }
      for (var i = 0; i < foreheadTop.length; i ++) {
        var coords = coordinates[foreheadTop[i]];
        canvas.overlayContext.lineTo(coords[0], coords[1] - chinDistance);
      }
      canvas.overlayContext.closePath();
      canvas.overlayContext.fill();
    }

    // var forehead = canvas.canvasContext.getImageData(center[0], center[1], 20, 20);
    // var length = forehead.data.length;

    // var sums = {
    //   green: 0,
    //   red: 0,
    //   blue: 0
    // };

    // for (i = 0; i < length; i += 4) {
    //   sums.red += forehead.data[i];
    //   sums.green += forehead.data[i + 1];
    //   sums.blue += forehead.data[i + 2];
    // }

    // // push the average of each channel to an array
    // channels.red.push(sums.red/length/4);
    // channels.green.push(sums.green/length/4);
    // channels.blue.push(sums.blue/length/4);

    // if (channels.green.length > buffer / 8) {
    //   console.log('ready to send');
    // }
    // // if the arrays of averages are longer than the buffer
    // // drop the last value and move the window
    // if (channels.green.length > buffer) {
    //   console.log('buffer full');
    //   channels.red.shift();
    //   channels.green.shift();
    //   channels.blue.shift();
    // }
  }
}