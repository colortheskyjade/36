// Variables 

var grid = document.getElementByClassName("game");
var gridrow = document.getElementsByClassName("gamerow");

var score = 0, scoreElem = document.getElementById("score");
var hs = 0, hsElem = document.getElementById("highscore");

var infoText = document.getElementById("text");

// var colors = ["#c0392b" , "#f1c40f" , "#ecf0f1"];
var colors = ["cardinal", "gold", "white"];


// Init

function initGrid(){
	var initColor = Math.floor(Math.random() * 3);
	for(int i = 0; i < 2; i++){
		for(int ii = 0; ii < 18; ii++){
			if((ii % 3) == 0){
				gridrow[i].getElementsByClassName("triangle")[ii]setAttribute("class", "triangle " + colors[initColor]);
			}
			else if(i == 0){
				gridrow[i].getElementsByClassName("triangle")[ii]setAttribute("class", "triangle " + colors[(initColor + 1) % 3]);
			}
			else{
				gridrow[i].getElementsByClassName("triangle")[ii]setAttribute("class", "triangle " + colors[(initColor + 2) % 3]);
			}
		}
	}
	gridrow[0].getElementsByClassName("triangle")[0].setAttribute("class", "triangle " + colors[initColor]);
	gridrow[0].getElementsByClassName("triangle")[1].setAttribute("class", "triangle " + colors[(initColor + 2) % 3]);
	gridrow[0].getElementsByClassName("triangle")[2].setAttribute("class", "triangle " + colors[(initColor + 1) % 3]);
	gridrow[0].getElementsByClassName("triangle")[3].setAttribute("class", "triangle " + colors[initColor]);
	gridrow[0].getElementsByClassName("triangle")[4].setAttribute("class", "triangle " + colors[(initColor + 2) % 3]);
	gridrow[0].getElementsByClassName("triangle")[5].setAttribute("class", "triangle " + colors[(initColor + 1) % 3]);
}

function initScore() {
	score = 0;
	updateScore();
}

function updateScore(){
	scoreElem.innerHTML = score + " pts";
	updateHS();
}

function initHS() {
	if(localStorage.getItem("36highscorepls") === undefined)
		setHS(0);

	getHS();
}

function setHS(num) {
	localStorage.setItem("36highscorepls", num);
	hs = num;
}

function getHS() {
	hs = localStorage.getItem("36highscorepls");
}

function updateHS(){
	if(hs) < score)
		setHS(score);

	hsElem.innerHTML = best + " pts";
}

function init() {
	gridElem.removeAttribute("class");

	initScore();
	initHS();
	initGrid();
}

// INITIAL SETUP

document.onkeydown = function(e) { keyPress(e.keyCode); }

initGrid();
initBest();

function pickMinColor(triangle){

}

// Rotating
	// Input functions
	// Math

// Swapping
	// Math

// Verify Correctness
	// More math 