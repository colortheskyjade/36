// Variables 

var grid = document.getElementsByClassName("game");
var gridrow = document.getElementsByClassName("gamerow");

var moves = 10;
// SCORE
var score = 0, scoreElem = document.getElementById("score");
// HIGH SCORE
var hs = 0, hsElem = document.getElementById("highscore");
// MOVES
var movesElem = document.getElementById("moves");

var infoText = document.getElementById("text");
var curRow = 0;
var colors = ["cardinal", "gold", "white", "black"];
var gameOn = true;

// Init

function initGrid(){
	var initColor = Math.floor(Math.random() * 3);
	var writeMe;
	for(var i = 0; i < 2; i++){
		for(var ii = 0; ii < 18; ii++){
			if(i == 0) { writeMe = " active"; } else { writeMe = "";}
			if((ii % 3) == 0){
				gridrow[i].getElementsByTagName("div")[ii].setAttribute("class", "triangle " + colors[initColor] + writeMe);
			}
			else if(i == 0){
				gridrow[i].getElementsByTagName("div")[ii].setAttribute("class", "triangle " + colors[(initColor + 1) % 3] + writeMe);
			}
			else{
				gridrow[i].getElementsByTagName("div")[ii].setAttribute("class", "triangle " + colors[(initColor + 2) % 3] + writeMe);
			}
		}
	}
	gridrow[2].getElementsByTagName("div")[0].setAttribute("class", "triangle " + colors[initColor]);
	gridrow[2].getElementsByTagName("div")[1].setAttribute("class", "triangle " + colors[(initColor + 2) % 3]);
	gridrow[2].getElementsByTagName("div")[2].setAttribute("class", "triangle " + colors[(initColor + 1) % 3]);
	gridrow[2].getElementsByTagName("div")[3].setAttribute("class", "triangle " + colors[initColor]);
	gridrow[2].getElementsByTagName("div")[4].setAttribute("class", "triangle " + colors[(initColor + 2) % 3]);
	gridrow[2].getElementsByTagName("div")[5].setAttribute("class", "triangle " + colors[(initColor + 1) % 3]);
}

function initScore() {
	score = 0;
	updateScore();
}

function updateScore(){
	scoreElem.innerHTML = score + " pts";
	updateHS();
}

function updateMoves(){
	movesElem.innerHTML = moves;
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
	if(hs < score)
		setHS(score);

	hsElem.innerHTML = hs + " pts";
}

function init() {
	curRow = 0;
	moves = 10;
	gameOn = true;

	initScore();
	initHS();
	updateHS();
	updateMoves();
	initGrid();
}

function updateActive(){
	var limit;
	$(".active").switchClass("active", "");

	if(curRow == 2){ limit = 6;} else{ limit = 18; }
	for(var i = 0; i < limit; i++){
		console.log(curRow);
		gridrow[curRow].getElementsByTagName("div")[i].className += " active" ;
	}
}

// Rotating
function moveU(){
	if(curRow > 0){
		curRow--;
		updateActive();
	}
	else{
		curRow = 0;
	}

}

function moveD(){
	if(curRow < 2){
		curRow++;
		updateActive();
	}
	else{
		curRow = 2;
	}
}

function moveL(){
	if(gridrow[2].getElementsByClassName("triangle").length == 0){
		return;
	}
	var temp = []; 
	if(curRow === 2){
		for(var i = 0; i < 6; i++){
			temp[i] = gridrow[2].getElementsByClassName("triangle")[i].className;
		}
		for(var i = 0; i < 6; i++){
			gridrow[2].getElementsByClassName("triangle")[i].setAttribute("class", temp[(i + 1) % 6]);
		}
	}
	else{
		for(var i = 0; i < 18; i++){
			temp[i] = gridrow[curRow].getElementsByClassName("triangle")[i].className;
		}
		for(var i = 0; i < 18; i++){
			gridrow[curRow].getElementsByClassName("triangle")[i].setAttribute("class", temp[(i + 1) % 18]);
		}
	}
}

function moveR(){
	if(gridrow[2].getElementsByClassName("triangle").length == 0){
		return;
	}
	var temp = []; 
	if(curRow === 2){
		for(var i = 0; i < 6; i++){
			temp[i] = gridrow[2].getElementsByClassName("triangle")[i].className;
		}
		for(var i = 0; i < 6; i++){
			gridrow[2].getElementsByClassName("triangle")[i].setAttribute("class", temp[(i + 5) % 6]);
		}
	}
	else{
		for(var i = 0; i < 18; i++){
			temp[i] = gridrow[curRow].getElementsByClassName("triangle")[i].className;
		}
		for(var i = 0; i < 18; i++){
			gridrow[curRow].getElementsByClassName("triangle")[i].setAttribute("class", temp[(i + 17) % 18]);
		}
	}
}

function swap(){
	var temp = [];
	for(var i = 0; i < 6; i++){
		temp[i] = gridrow[2].getElementsByTagName("div")[i].className;
	}

	gridrow[2].getElementsByTagName("div")[0].className = gridrow[1].getElementsByTagName("div")[0].className;
	gridrow[2].getElementsByTagName("div")[1].className = gridrow[1].getElementsByTagName("div")[1].className;
	gridrow[2].getElementsByTagName("div")[2].className = gridrow[0].getElementsByTagName("div")[1].className;
	gridrow[2].getElementsByTagName("div")[3].className = gridrow[0].getElementsByTagName("div")[0].className;
	gridrow[2].getElementsByTagName("div")[4].className = gridrow[0].getElementsByTagName("div")[17].className;
	gridrow[2].getElementsByTagName("div")[5].className = gridrow[1].getElementsByTagName("div")[17].className;

	gridrow[1].getElementsByTagName("div")[0].className = temp[0];
	gridrow[1].getElementsByTagName("div")[1].className = temp[1];
	gridrow[0].getElementsByTagName("div")[1].className = temp[2];
	gridrow[0].getElementsByTagName("div")[0].className = temp[3];
	gridrow[0].getElementsByTagName("div")[17].className = temp[4];
	gridrow[1].getElementsByTagName("div")[17].className = temp[5];
}

function resetActive(){
	$("div").removeClass("active");
	for(var i = 0; i < 42; i++){
		if(Math.floor(i/18) == curRow){
			gridrow[Math.floor(i / 18)].getElementsByTagName("div")[i % 18].className += " active";
		}
	}
}

function keyPress(code) {
	$("div").removeClass("popout");
	if(code === 27){
		init(); // esc
	}
	else if(!gameOn){
		return;
	}
	else if(code === 37 || code === 74){
		moveL(); // left
		calcScore();
	}
	else if(code === 38 || code === 73){
		moveU(); // up
	}
	else if(code === 39 || code === 76){
		moveR(); // right
		calcScore();
	}
	else if(code === 40 || code === 75){
		moveD(); // down
	}
	else if(code === 32){
		swap(); // space
		calcScore();
	}
	resetActive();
}

document.onkeydown = function(e) { keyPress(e.keyCode); }

// Verify Correctness

// return adjacencies in an array [left, up/down, right]
function adjacencies(row, col){
	var triple = new Array();

	// left one
	if(row < 2){
		triple[0] = gridrow[row].getElementsByTagName("div")[(col + 17) % 18];
	}
	else{
		triple[0] = gridrow[row].getElementsByTagName("div")[(col + 5) % 6];
	}

	// up or down one

	if(row === 0){
		if(col % 3 == 0){
			triple[1] = null;
		}
		else{
			triple[1] = gridrow[1].getElementsByTagName("div")[col];
		}
	}
	else if(row === 1){
		if(col % 3 == 0){
			triple[1] = gridrow[2].getElementsByTagName("div")[Math.floor(col / 3)];
		}
		else{
			triple[1] = gridrow[0].getElementsByTagName("div")[col];
		}
	}
	else{
		triple[1] = gridrow[1].getElementsByTagName("div")[col * 3];
	}

	// right one
	if(row < 2){
		triple[2] = gridrow[row].getElementsByTagName("div")[(col + 1) % 18];
	}
	else{
		triple[2] = gridrow[row].getElementsByTagName("div")[(col + 1) % 6];
	}

	return triple;
}

// return the adjacencies that match the triangle
function matches(row, col){
	if((row * 18 + col) > 41){return null;}
	var adj = adjacencies(row, col);
	var current = gridrow[row].getElementsByClassName("triangle")[col];
	var matches = new Array();
	for(var i = 0; i < adj.length; i++){
		if(adj[i] == null)
			continue;
		else if(adj[i].className === current.className || adj[i].className + " active" == current.className ||
			adj[i].className == current.className + " active"){
			matches.push(adj[i]);
		}
	}
	return matches;
}

function getCoordsOf(triangle){
	var row, col;
	row = parseInt(triangle.id.split(/[rc]/)[1]);
	col = parseInt(triangle.id.split(/[rc]/)[2]);
	return {row: row, col: col};
}

function findGridMatches(){
	var centers = new Array();
	var fours = new Array();
	var groupMatches = new Array();
	var temp, temp2;

	for(var i = 0; i < 42; i++){
		temp = matches(Math.floor(i / 18), i % 18);
		if(temp.length > 1){
			groupMatches.push(temp);
			centers.push(gridrow[Math.floor(i / 18)].getElementsByTagName("div")[i % 18]);
		}
	}

	return {centers: centers.length, groupMatches: groupMatches}
}

// Calculate score, update it, add new triangles
function calcScore(){
	var data = findGridMatches();

	if(data.centers > 0){
		if(data.centers > 1){
			moves += 2;
			score += Math.pow(3, (data.centers)) * 200;
		}
		else{
			moves++;
			score += 500;
		}
		recolor(data.groupMatches);
	}else{
		moves--;
	}

	updateMoves();
	updateScore();

	if(moves < 1){
		endGame();
	}
}

// let's just use [cardinal, gold, white]
function recolor(triangles){
	var temp, m, colors, index;
	for(var i = 0; i < triangles.length; i++){
		for(var x = 0; x < triangles[i].length; x++){
			temp = getCoordsOf(triangles[i][x]);
			m = adjacencies(temp.row, temp.col);
			colors = [0,0,0,0];
			for(var j = 0; j < m.length; j++){
				if(m[j] == null){continue;}
				else if(m[j].className == "triangle cardinal" || m[j].className == "triangle cardinal active" ){
					colors[0]++;
				}
				else if(m[j].className == "triangle gold" || m[j].className == "triangle gold active"){
					colors[1]++;
				}
				else if(m[j].className == "triangle white" || m[j].className == "triangle white active"){
					colors[2]++;
				}
				else{
					colors[3]++;
				}
			}
			for(var j = 0; j < 4; j++){
				if(colors[j] == 0){
					index = j;
					break;
				}
			}

			if(Math.random() * 10 > 5){
				index = Math.floor((index + Math.random() * 4) / 2);
			}

			if(index == 0)
				triangles[i][x].className = "triangle cardinal";
			else if(index == 1)
				triangles[i][x].className = "triangle gold";
			else if(index == 2)
				triangles[i][x].className = "triangle white";
			else
				triangles[i][x].className = "triangle black";
			if(temp.row == curRow){
				triangles[i][x].className += " active";
			}
			triangles[i][x].className += " popout";
		}
	}
}

// End Game
function endGame(){
	$(".triangle").switchClass("triangle", "done");
	gameOn = false;
	$(".active").switchClass("active", "");
}

init();