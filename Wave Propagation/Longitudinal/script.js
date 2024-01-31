// Select the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the width and height of the canvas
canvas.width = 800;
canvas.height = 500;



function Circle(x, y, amplitude, frequency, phase, wavelength){
  this.x = x;
  this.y = y;
  this.amplitude = amplitude;
  this.frequency = frequency;
  this.phase = phase;
  this.wavelength = wavelength;



  // Set initial amplitude value to default value of the amplitude input
  this.amplitude = Number(document.getElementById('amplitude').value);

  // Set initial frequency value to default value of the frequency input
  this.frequency = Number(document.getElementById('frequency').value);                                           

  // Set initial phase value to default value of the phase input
  //this.phase = Number(document.getElementById('phase').value );

  // Set initial wavelength value to default value of the wavelength input
  this.wavelength = Number(document.getElementById('wavelength').value);

  
  
  this.draw = function(){
    // Creating a cirle
    ctx.beginPath(); // Begin a new path for the circle: Use this instead if u want the circles disconnected
    
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false); // Creates a circle
    ctx.strokeStyle= 'black';
    if (circleArray.indexOf(this) === 0 || circleArray.indexOf(this) === 6) {
      ctx.fillStyle = 'red';
    } 
    else {
      ctx.fillStyle = 'blue';
    }
    
    //ctx.fill();
    ctx.stroke(); // Draws the circle

  }
  this.update = function(time){

    // this.y=this.amplitude * Math.sin(this.frequency * time - this.phase) + y;
    //this.y = this.amplitude * Math.sin(2 * Math.PI * this.x / this.wavelength - this.frequency * time + this.phase) + y;
    // this.x = this.x + this.wavelength / 2 * Math.sin(2 * Math.PI * this.y / this.wavelength + this.phase) ;
    this.x = this.amplitude * Math.sin(2 * Math.PI * x / this.wavelength - this.frequency * time + this.phase) + x; //USE
    //this.x = this.amplitude * Math.sin(2 * Math.PI * this.frequency * time - 2 * Math.PI * x / this.wavelength) + x;
    


    this.draw();
  }

}

var circleArray = [];
var x= 100;
var y= 250;
//var phaseRatio= 6;
for (var i=0; i<13; i++){
  circleArray.push(new Circle(x, y, 1, 3, i*Math.PI/6, 1));
  x=x+50;

}


let animationPlaying = false; // Flag to keep track of whether animation is playing or not

function animate(){
  if (animationPlaying) { // Only run animation if it is currently playing
    requestAnimationFrame(animate);
  
    ctx.clearRect(0, 0, innerWidth, innerHeight);
  
    const time = Date.now() / 1000;
    for(let i=0; i<circleArray.length; i++){
      circleArray[i].update(time);
      ctx.fill();
    }
  }
}

function toggleAnimation() {
  animationPlaying = !animationPlaying; // Toggle the flag
  if (animationPlaying) {
    animate(); // Start animation if it is now playing
    document.getElementById("playBtn").textContent = "Pause"; // Change button text to "Pause"
  } else {
    document.getElementById("playBtn").textContent = "Play"; // Change button text to "Play"
  }
}

document.getElementById("playBtn").addEventListener("click", toggleAnimation);


const amplitudeInput = document.getElementById('amplitude');
amplitudeInput.addEventListener('input', function() {
  const newAmplitude = Number(amplitudeInput.value);
  for(let i=0; i<circleArray.length; i++){
    circleArray[i].amplitude = newAmplitude;
  }
});

const frequencyInput = document.getElementById('frequency');
frequencyInput.addEventListener('input', function() {
  const newFrequency = Number(frequencyInput.value);
  for(let i=0; i<circleArray.length; i++){
    circleArray[i].frequency = newFrequency;
  }
});

const phaseInput = document.getElementById('phase');
phaseInput.addEventListener('input', function() {
const newPhase = Number(phaseInput.value);
  //const phaseRatio = 6; // Update this value to the number of phase ratios you want to use
  for(let i = 0; i < circleArray.length; i++) {
    circleArray[i].phase = i * Math.PI / newPhase;
  }
});

const wavelengthInput = document.getElementById('wavelength');
wavelengthInput.addEventListener('input', function() {
  const newWavelength = Number(wavelengthInput.value);
  for(let i=0; i<circleArray.length; i++){
    circleArray[i].wavelength = newWavelength ;
  }
});

// const phaseInput = document.getElementById('phase');
// phaseInput.addEventListener('input', function() {
//   const newPhase = Number(phaseInput.value) ;
//   for(let i=0; i<circleArray.length; i++){
//     circleArray[i].phase = newPhase;
//   }
// });




//circleArray[i].phase = phaseValue * Math.PI / 180; // Convert the phase value from degrees to radians