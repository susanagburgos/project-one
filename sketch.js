// P5 STUFF
var dots=[];
var userList = []; 
var columns=100;
var rows=140;
var fillR;
var fillG;
var fillB;
var x, y, i, r, color;
var isBlack = true;
var xvalue, yvalue;
var beta, gamma;


function setup() {
	createCanvas(900,1450);
	// background("white");

	//spacing between our dots
	var widthSpacing= 10;
	var heightSpacing=10;

	fillR= Math.floor(random(0,255));
	fillG= Math.floor(random(0,255));
	fillB= Math.floor(random(0,255));

	//creating the grid
	for(y = 0; y < rows; y++){
		for (x = 0; x < columns; x++){
			var xSpace = 5 + widthSpacing* x;
			var ySpace = 5 + heightSpacing* y;

			dots.push(new Dot(xSpace, ySpace, 2));
		}
	}
}

function draw() {
	background("white");

	//displaying the dots that we declared in the array 
	for(i= 0; i< dots.length; i++) {
		dots[i].display();

		if(dots[i].check()){
			// console.log(dots[i].x);

			var dataToSend = {
				"i": i,
				// "x": dots[i].x, 
				// "y": dots[i].y
			}
			sendDots(dataToSend);
			// console.log("sending dot to the server");
		}

	}

	yvalue= map(beta, 30, 50, 0 , 1200); 
	xvalue= map(gamma, -50, 50, 0, 900);
	fill(fillR, fillG, fillB);
	ellipse(xvalue, yvalue, 20, 20);
}

function init(){

	////ORIENTATION

	//function for orienation
	function handleOrientation(event){
		beta = Math.floor(event.beta);
		gamma = Math.floor(event.gamma);

		//send the values to the DOM so we can actually see what they are 
		// document.getElementById('alpha').innerHTML = alpha;
		// document.getElementById('beta').innerHTML = beta;
		// document.getElementById('gamma').innerHTML = gamma;

		socket.emit('orientation',{
			// 'alpha':alpha,
			'beta': beta,
			'gamma': gamma
		});

	}

	//event listener for orientation--- built into js
	window.addEventListener('deviceorientation', handleOrientation, true);

}


function sendDots(whichDot) {
	socket.emit('dots', whichDot); 	
} 

function mouseMoved() {
	for(var i = 0; i < dots.length; i++) {
  		dots[i].check();
  	}
}

function Dot(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
	this.color= 'black'; 
	this.black = true; 

	this.display = function(){
		fill(this.color);
		noStroke();
		ellipse(this.x, this.y, this.r * 2);
	}

	this.check = function(){
		var dis = dist(xvalue, yvalue, this.x, this.y);

		if (dis < 30) {
				this.color = 'white';
				// console.log(this.color);
				// console.log("you hit the dot");
				return true;
		}

	}
}
window.addEventListener("load", init);

    


