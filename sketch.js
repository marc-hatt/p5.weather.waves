let weatherdays=[]; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let key='09c8d61f6952497a80893309191101'; // signup https://www.apixu.com/signup.aspx
/*https://api.apixu.com/v1/forecast.json?key=09c8d61f6952497a80893309191101+&q=Zürich&days=1*/
let d=1000;

let input, button;
let maxwindwave;
let maxwind; // Height of wave
let temp;
let degree;
let xspacing = 4; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0; // Start angle at 0
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let wind;
let position;


function setup() {
    createCanvas(windowWidth, windowHeight);
    w = width + 16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));
    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q='+'&q=Zürich&days=7'+'&days=7';
    wind = createVector();

    input = createInput();
    input.position(width/2-70,height/2);
    button=createButton('SUBMIT');
    button.position(input.x + input.width, height/2);
    button.mousePressed(reloadJson);

    loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf
}

function draw() {
    background(255);
    push();
    translate(32, height - 32);
    // Rotate by the wind's angle
    rotate(wind.heading() + PI/2);
    pop();
    calcWave();
    renderWave();
    calcWave1();
    renderWave1();
    calcWave2();
    renderWave2();
    calcWave3();
    renderWave3();
}

function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.02;

    // For every x value, calculate a y value with sine function
    let x = theta + maxwind;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * maxwindwave *2;
        x += dx;
    }
}

function calcWave1() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.02;

    // For every x value, calculate a y value with sine function
    let x = theta + maxwind;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * maxwindwave *6;
        x += dx;
    }
}

function calcWave2() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.02;

    // For every x value, calculate a y value with sine function
    let x = theta + maxwind;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * maxwindwave *4;
        x += dx;
    }
}

function calcWave3() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.02;

    // For every x value, calculate a y value with sine function
    let x = theta + maxwind;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * maxwindwave *1;
        x += dx;
    }
}

function renderWave() {
    noStroke();
    fill(173,216,230);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
        ellipse(x * xspacing, height / 2 + yvalues[x], 4, 4);
    }
}

function renderWave1() {
    noStroke();
    fill(123,176,180);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
        ellipse(x * xspacing, height / 2 + yvalues[x], 4, 4);
    }
}

function renderWave2() {
    noStroke();
    fill(143,196,200);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
        ellipse(x * xspacing, height / 2 + yvalues[x], 4, 4);
    }
}

function renderWave3() {
    noStroke();
    fill(193,246,250);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
        ellipse(x * xspacing, height / 2 + yvalues[x], 4, 4);
    }
}

function reloadJson(){
    let ort = input.value();
    let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q='+ort+'&days=7';

    loadJSON(url, gotWeather);
}

function gotWeather(weather) {
    maxwindwave=weather.current.wind_mph *3;
    maxwind=weather.current.wind_mph +0.1;
    temp=weather.current.temp_c;
    degree=weather.current.wind_degree;
    weatherdays=weather.forecast.forecastday;
    let angle = radians(Number(weather.current.wind_degree));
    wind = p5.Vector.fromAngle(angle);
    console.log(maxwindwave);
    console.log(maxwind);
    console.log(degree);
}