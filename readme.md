This is the beginnings of pulling [Pulse](https://github.com/camilleanne/pulse) into modular pieces. End goal is a couple of fully tested modular libraries for webcam pulse detection. This is so very very very much a WIP. Keep expectations to a minimum.

### go

```
npm install
npm run build
npm start
open localhost:something
```


To do:

* ~~get a rectangle on the forehead~~
* ~~get the color stream~~
* pipe that stream to a backend (websockets again??)
* ~~stop vendoring CLMtracker and pull it in via package.json and browserify~~
* find a new matrix math library for node
* read up on new research in photoplethysmography:
  - "Non-contact, automated cardiac pulse
measurements using video imaging and blind
source separation." Ming-Zher Poh, Daniel J. McDuff, and Rosalind W. Picard (2010)
  - "Non-contact estimation of heart rate and oxygen saturation using ambient light" Ufuk Bal (2014)
  - "DistancePPG: Robust non-contact vital
signs monitoring using a camera" Mayank Kumar, Ashok Veeraraghavan, and Ashutosh Sabharwal (2015)
  - "Non-contact detection of oxygen saturation based on visible light imaging device using ambient light" Lingqin Kong, et al (2013)

backend:

* ugh all of it
* tests
