//String name;
let numberofconfirmed;
let numberofdeath;
let numberofrecovered;
let latitude;
let longitude;
let randomxy =[];

function setup() {
  createCanvas(960,540);

  input = createInput();
  input.position(20, 45);

  button = createButton('submit');
  button.position(input.x + input.width, 45);
  button.mousePressed(greet);
  
  greeting = createElement('h2', 'Choose your country');
  greeting.position(20, 5);
  greeting.style('font-size','15px');
  greeting.style('color','#ffffff');


  //console.log(name);
  bg = loadImage('/05-data/wp2787778.jpg');
  randomxy = randomgenerator(50);
}

function draw(){
	background(bg);
	datavisual(2.73441*longitude+446.57846,-2.62776*latitude+331.56892,50,randomxy);
}

function greet() {
  const name = input.value();
  greeting.html('The country you chose is ' + name);
  httpGet('https://covid19-api.com/country?name='+name,'json',myCallback);
  //input.value('');
}

function myCallback(result){
  //console.log(result);
  console.log(result[0])
  //country = result[0].country;
  numberofconfirmed = result[0].confirmed;
  numberofdeath = result[0].deaths;
  numberofrecovered = result[0].recovered;
  latitude = result[0].latitude;
  longitude = result[0].longitude;
  //console.log(result[0]);
  /*
  console.log(numberofconfirmed);
  console.log(numberofdeath);
  console.log(numberofrecovered);
  */
}

function randomgenerator(radiusinput){
	let randomvalue = [];
	for(i=0;i<10000;i++){
		let radius = random(radiusinput);
  		let a = random(TWO_PI);

  		let x = cos(a)*radius;
  		let y = sin(a)*radius;

  		randomvalue[i] = [x,y];
	}
	return randomvalue;
}

function mousedetected(xpos,ypos,radius){
	if ((mouseX > xpos-radius) && (mouseX < xpos+radius) &&
    (mouseY > ypos-radius) && (mouseY < ypos+radius)) {
    return true;
  } else {
    return false;
  }
}

function preload(){
	confirmedimage = loadImage('/05-data/confirmed.png');
	recoveredimage = loadImage('/05-data/recovered.png')
	deathimage = loadImage('/05-data/death.png')
}

function datavisual(xpos,ypos,radius,countryrandom){
	if(numberofconfirmed != undefined){
		textAlign(CENTER);				
		textSize(15);
		noStroke();
		fill(255,200,0);
		for(i = 0;i <= numberofconfirmed/1000;i++){
			if(mousedetected(xpos,ypos,radius)){
				image(confirmedimage,xpos-100-20,ypos-100,40,40);
				circle(xpos+countryrandom[i][0]-100,ypos+countryrandom[i][1],2);
				//fill(255,200,0);
				text(numberofconfirmed,xpos-100,ypos+80);
			}
			else{
				circle(xpos+countryrandom[i][0],ypos+countryrandom[i][1],2);
			}
		}
		fill(100,255,0);
		for(i = 3000;i <= numberofrecovered/1000+3000;i++){
			if(mousedetected(xpos,ypos,50)){
				image(recoveredimage,xpos+100-20,ypos-100,40,40);
				circle(xpos+countryrandom[i][0]+100,ypos+countryrandom[i][1],2);
				//textSize(15);
				text(numberofrecovered,xpos+100,ypos+80);
			}
			else{
				circle(xpos+countryrandom[i][0],ypos+countryrandom[i][1],2);
			}
		}
		fill(255,0,0);
		for(i = 6000;i <= numberofdeath/1000+6000;i++){
			if(mousedetected(xpos,ypos,50)){
				image(deathimage,xpos-20,ypos-100,40,40);
				//textSize(15);
				text(numberofdeath,xpos,ypos+80);
			}else{

			}
			circle(xpos+countryrandom[i][0],ypos+countryrandom[i][1],2);
		}
	}
}
