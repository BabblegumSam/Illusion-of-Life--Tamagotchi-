let canvas;
let gui;

let points = [];
let mult = 0.005;
let size, isAnimated, colorMix, colorFill;
let font, outline, inp;
let density, space, speed;
let colorFromButton, colorToButton;
let sliderDense, sliderRote, sliderSpeed, sliderSize;
let wMargin, hMargin;

function setup() {

  canvas = createCanvas(windowWidth/1.5, windowHeight/2);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

	// Set parameters to be used for the tool, color, and slider input interfaces
 	wMargin = windowWidth/2;
	hMargin = windowHeight*(7/9);
	noStroke();

	// Initialize Input interfaces

  addGUI();
	
	// Set the inputs from the interface into variables
	colorFrom = colorFromButton.color();
	colorTo = colorToButton.color();
	colorMix = 0;
	
	density = sliderDense.value();
	speed = sliderSpeed.value();
		frameRate(speed);
	mult = sliderRote.value();
		angleMode(DEGREES);
	size = sliderSize.value();
	noiseDetail(0.0001);

	
	
	// This function initializes the sketch by resetting the number of points in the array 
	// and then places a new number of points into the array depending on the settings determined by the input interface.
	resetSketch();


}


function draw() {
	
	// Reintializing the values of the variables so that they stick to the settings on your interface
	colorFrom = colorFromButton.color();
	colorTo = colorToButton.color();
	density = sliderDense.value();
	speed = sliderSpeed.value();
		frameRate(speed);
	mult = sliderRote.value();
	size = sliderSize.value();
	
	toolBar();
	

	if (isAnimated > 2) { // this conditional statement makes it so that the sketch is only initialized after pressing the start button
		flow(); 	// this function updates the sketch and draws the flow field
	}
} 

function mousePressed() { // SECRET FUNCTION: CREATE NEW POINT ON MOUSECLICK
		let p = createVector(mouseX, mouseY);
		points.push(p);
		
}

function resetSketch() {
	background(30);
	points = [];

	size = 0;
	colorMix = 0;
	space = width/density; 
	
	isAnimated = 2;	

	for (var x = 0; x < width; x += space) {
		for (var y = 0; y < height; y += space) {
			let p = createVector(x + random (-25, 25), y + random (-25, 25));
			points.push(p);
		}
	}
}

function flow() {

	for (let i = points.length - 1; i >= 0; i--) {
		colorFill = lerpColor(colorFrom, colorTo, colorMix);
		fill(colorFill);
		var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720); // this sets the angle/direction for flow field generation
		
		points[i].add(createVector(cos(angle), sin(angle)));
		
		ellipse(points[i].x, points[i].y, size);
		
		colorMix += 0.000001; // this changes the color of the points drawn as the sketch is drawn
	}
	size += 0.005; // this enlarges the flow field points very slowly as the sketch is drawn

}

function addGUI() {
  sliderBar();
	colorBar();
	toolBar();
}

function toolBar() {
	
	let startButton, resetButton, snapButton;
	
	let playSymb = String.fromCharCode(9654);
	let stopSymb = String.fromCharCode(9724);
	let resetSymb = String.fromCharCode(8635);




	startButton = createButton(isAnimated%2 == 0 ? 'START ' + playSymb : 'STOP ' + stopSymb); // this switches back and forth between START and STOP with each press
  startButton.addClass("button");
  startButton.parent("gui-container");
  startButton.position(wMargin-205, hMargin);
	startButton.mousePressed(startStop);
	startButton.style('background', isAnimated%2 == 0 ? '#72ce4e' : '#ff6666');
	// startButton.style('font-family', 'Verdana');
	// startButton.style('font-size', '30px');
	// startButton.style('padding', '10px');
	// startButton.style('width', '200px');
	// startButton.style('border-radius', '12px');
	
	resetButton = createButton('RESET ' + resetSymb);
  resetButton.addClass("button");
  resetButton.parent("gui-container");

	resetButton.position(wMargin+5, hMargin);
	resetButton.mousePressed(resetSketch);
	resetButton.style('background', '#53c0cf');
	resetButton.style('font-family', 'Verdana');
	resetButton.style('font-size', '30px');
	resetButton.style('padding', '10px');
	resetButton.style('width', '200px');
	resetButton.style('border-radius', '12px');
	
}

function startStop() {
	isAnimated++; 
	isAnimated%2 == 1 ? loop() : noLoop();
}

function colorBar() {
		
	colorFromButton = createColorPicker(color(255, 0, 0));
	colorToButton = createColorPicker(color(255, 255, 0));
  
	
	let txtFrom = createDiv('COLOR FROM');
  txtFrom.position(wMargin+220, hMargin);
  txtFrom.addClass("colortxt");

	
	colorFromButton.position(wMargin + 255, hMargin+25);
	colorFromButton.addClass("colorpck");
	
	let txtTo = createDiv('COLOR TO');
  txtTo.position(wMargin+365, hMargin);
  txtTo.addClass("colortxt");

	
	colorToButton.position(wMargin + 380, hMargin+25);
	colorToButton.addClass("colorpck");
}

function sliderBar() {	

	let txtDense = createDiv('DENSITY');
  txtDense.position(wMargin-560, hMargin);
	txtDense.addClass("colortxt");
		
	sliderDense = createSlider(10, 100, 100, 1);
	sliderDense.position(wMargin-560, hMargin+15);
	sliderDense.addClass("slide");
	
	let txtRote = createDiv('ROTATION');
  txtRote.position(wMargin-560, hMargin+35);
	txtRote.addClass("colortxt");
	
	sliderRote = createSlider(0.0005, 0.1, 0.05, 0.0001);
	sliderRote.position(wMargin-560, hMargin+50);
	sliderRote.addClass("slide");
	
	let txtSpeed = createDiv('SPEED');
  txtSpeed.position(wMargin-380, hMargin);
	txtSpeed.addClass("colortxt");
  
	sliderSpeed = createSlider(5, 60, 30, 1);
	sliderSpeed.position(wMargin-380, hMargin+15);
	sliderSpeed.addClass("slide");
	
	let txtSize = createDiv('SIZE');
  txtSize.position(wMargin-380, hMargin+35);
	txtSize.addClass("colortxt");
	
	sliderSize = createSlider(0.5, 3, 1, 0.1);
	sliderSize.position(wMargin-380, hMargin+50);
	sliderSize.addClass("slide");

}
	
	


