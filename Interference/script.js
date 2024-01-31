// // Select the canvas element
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// // Set the width and height of the canvas
// canvas.width = 800;
// canvas.height = 500;



// function Circle(x, y, amplitude, frequency, phase){
//   this.x = x;
//   this.y = y;
//   this.amplitude = amplitude;
//   this.frequency = frequency;
//   this.phase = phase;
//   // this.wavelength = wavelength;



//   // Set initial amplitude value to default value of the amplitude input
//   this.amplitude = Number(document.getElementById('amplitude').value);

//   // Set initial frequency value to default value of the frequency input
//   this.frequency = Number(document.getElementById('frequency').value);                                           

//   // Set initial phase value to default value of the phase input
//   //this.phase = Number(document.getElementById('phase').value );

//   // Set initial wavelength value to default value of the wavelength input
//   // this.wavelength = Number(document.getElementById('wavelength').value);

  
  
//   this.draw = function(){
//     // Creating a cirle
//     ctx.beginPath(); // Begin a new path for the circle: Use this instead if u want the circles disconnected
    
//     ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false); // Creates a circle
//     ctx.strokeStyle= 'black';
//     if (circleArray.indexOf(this) === 0) {
//       ctx.fillStyle = 'red';
//     } 
//     else {
//       ctx.fillStyle = 'blue';
//     }
    
//     //ctx.fill();
//     ctx.stroke(); // Draws the circle

//   }
//   this.update = function(time){

//     this.y=this.amplitude * Math.sin(this.frequency * time - this.phase) + y;
//      //this.y = this.amplitude * Math.sin(2 * Math.PI * this.x / this.wavelength - this.frequency * time + this.phase) + y;
     
    
    


//     this.draw();
//   }

// }

// var circleArray = [];
// var x= 100;
// var y= 270;
// //var phaseRatio= 6;
// for (var i=0; i<13; i++){
//   circleArray.push(new Circle(x, y, 40, 3, i*Math.PI/6));
//   x=x+50;

// }


// let animationPlaying = false; // Flag to keep track of whether animation is playing or not

// function animate(){
//   if (animationPlaying) { // Only run animation if it is currently playing
//     requestAnimationFrame(animate);
  
//     ctx.clearRect(0, 0, innerWidth, innerHeight);
  
//     const time = Date.now() / 1000;
//     for(let i=0; i<circleArray.length; i++){
//       circleArray[i].update(time);
//       ctx.fill();
//     }
//   }
// }

// function toggleAnimation() {
//   animationPlaying = !animationPlaying; // Toggle the flag
//   if (animationPlaying) {
//     animate(); // Start animation if it is now playing
//     document.getElementById("playBtn").textContent = "Pause"; // Change button text to "Pause"
//   } else {
//     document.getElementById("playBtn").textContent = "Play"; // Change button text to "Play"
//   }
// }

// document.getElementById("playBtn").addEventListener("click", toggleAnimation);


// const amplitudeInput = document.getElementById('amplitude');
// amplitudeInput.addEventListener('input', function() {
//   const newAmplitude = Number(amplitudeInput.value);
//   for(let i=0; i<circleArray.length; i++){
//     circleArray[i].amplitude = newAmplitude;
//   }
// });

// const frequencyInput = document.getElementById('frequency');
// frequencyInput.addEventListener('input', function() {
//   const newFrequency = Number(frequencyInput.value);
//   for(let i=0; i<circleArray.length; i++){
//     circleArray[i].frequency = newFrequency;
//   }
// });

// const phaseInput = document.getElementById('phase');
// phaseInput.addEventListener('input', function() {
// const newPhase = Number(phaseInput.value);
//   //const phaseRatio = 6; // Update this value to the number of phase ratios you want to use
//   for(let i = 0; i < circleArray.length; i++) {
//     circleArray[i].phase = i * Math.PI / newPhase;
//   }
// });

// // const wavelengthInput = document.getElementById('wavelength');
// // wavelengthInput.addEventListener('input', function() {
// //   const newWavelength = Number(wavelengthInput.value);
// //   for(let i=0; i<circleArray.length; i++){
// //     circleArray[i].wavelength = newWavelength ;
// //   }
// // });


// Select the canvas element
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// // Set the width and height of the canvas
// canvas.width = 800;
// canvas.height = 500;

let mouseY = 0;
let mouseX = 0;
let isDragging = false;
let MODE = 'DRAG_CENTER'
//let MODE = 'MOVE_LEFT_END'



function update(i, y_t0, y_t1, c, gam, l, dx, dt) {
  return 1 / (1 / (c*dt)**2 + gam/(2*dt))
          * (1/dx**2 * (y_t1[i+1] - 2*y_t1[i] +  y_t1[i-1]) 
             - 1/(c*dt)**2 * (y_t0[i] - 2*y_t1[i] )
             + gam/(2*dt) * y_t0[i] 
             - (l/ dx**2)**2 * (y_t1[i-2] - 4*y_t1[i-1] + 6*y_t1[i] -4*y_t1[i+1] + y_t1[i+2]))
}

class String {
  constructor(N) {
    this.N = N
    this.x =[...Array(this.N)].map((_, i) => i/this.N);
    this.y_t0 = this.x.map(xi => 0)
    this.y_t1 = structuredClone(this.y_t0);
    this.y_t2 = structuredClone(this.y_t0);
    this.gam = 200
    this.l = 0.002
    this.dx = this.x[1] - this.x[0]
    this.c = 1/100
    this.dt = 0.2
    console.log((this.c*this.dt/this.dx)**2)
  }
  move(draw) {
    //Boundary Conditions
    this.y_t2[0] = this.y_t1[0]
    this.y_t2[1] = this.y_t1[1]
    this.y_t2[this.N-2] = this.y_t1[this.N-2]
    this.y_t2[this.N-1] = this.y_t1[this.N-1]
    //PDE
    for (let i=2; i<this.y_t1.length-2; i++) {
      this.y_t2[i] = update(i, this.y_t0, this.y_t1, this.c, this.gam, this.l, this.dx, this.dt)
      if (draw) drawString(this, i)
    }
    this.y_t0 = structuredClone(this.y_t1)
    this.y_t1 = structuredClone(this.y_t2)
  };
}

//Draw line between i-1 and ith point of string
function drawString(s, i) {
  context.beginPath();
  context.lineWidth = 5
  context.strokeStyle = "blue";
  let {x_cnv: x_cnv0, y_cnv: y_cnv0} = strng2cnv_coords(s.x[i-1], s.y_t2[i-1])
  let {x_cnv: x_cnv1, y_cnv: y_cnv1} = strng2cnv_coords(s.x[i], s.y_t2[i])
  context.moveTo(x_cnv0, y_cnv0);
  context.lineTo(x_cnv1, y_cnv1);
  context.stroke();
}


function strng2cnv_coords(x_str, y_str) {
  return {x_cnv: canvas.width * x_str,
          y_cnv: y_str*canvas.width + canvas.height/2}
}
function cnv2strng_coords(x_cnv, y_cnv) {
  return {x_str: x_cnv / canvas.width,
          y_str: (y_cnv - canvas.height/2) / canvas.width }
}

function dragString(s) {
  let {x_str, y_str} = cnv2strng_coords(mouseX, mouseY)
  if (MODE=='MOVE_LEFT_END') {
    s.y_t1[0] = s.y_t1[1] = y_str
  }
  else if (MODE=='DRAG_CENTER') {
    s.y_t1[Math.round(s.N*x_str)] = y_str
  }
}


addEventListener("mousemove", (e) => {  
  mouseX = e.clientX;
  mouseY = e.clientY;
},
);

addEventListener("mousedown", (e) => {
  isDragging = true;
},
);

addEventListener("mouseup", (e) => {
  isDragging = false;
},
);


addEventListener("resize", () => setSize());
function setSize() {
  canvas.height = 500; //innerHeight
  canvas.width = 800; //innerWidth
}

function anim() {
  requestAnimationFrame(anim);
  context.fillStyle = "rgba(255, 255, 255)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (let i=5; i--;) { 
    s.move(draw=(i==0))
    if (isDragging) dragString(s)
  }
}

let s = new String(200)
setSize();
anim();















