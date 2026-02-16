let currentScene = "map";
let oceanOffset = 0;

let disasterData = {
    //Data ranging from 2010-2020. WILL STILL TWEAK DEPENDING ON RESEARCH. NUMBERS NOT FINAL//
    California: {type: "wildfire", total_events: 70000,  average_severity: 5, total_damage_billions: 53.5, total_deaths: 250},
    Alaska: {type: "earthquake", total_events: 450000, average_severity: 4, total_damage_billions: 0, total_deaths: 0},
    Florida: {type: "hurricane", total_events: 0, average_severity: 0, total_damage_billions: 0, total_deaths: 0},
    Texas: {type: "tornado", total_events: 0, average_severity: 0, total_damage_billions: 0, total_deaths: 0}
}
// STATE CLICKABLE AREAS
let stateBoxes = {
Califronia : {x: 100, y: 300, width: 80, height: 80},
Alaska : {x: 50, y: 50, width: 100, height: 100},
Florida : {x: 600, y: 400, width: 60, height: 60},
Texas : {x: 400, y: 350, width: 100, height: 100},
};

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(20);
    drawOcean();
    if (currentScene === "map") {
        drawMap();
    } else if (currentScene === "wildfire") {
        wildfireScene();
    } else if (currentScene === "earthquake") {
        earthquakeScene();
    } else if (currentScene === "hurricane") {
        hurricaneScene();
    } else if (currentScene === "tornado") {
        tornadoScene();
    }   }

//BACKGROUND OCEAN ANIMATION
function drawOcean() {
    oceanOffset += 0.1;
    for (let x = 0; x < width; x += 20) {
        stroke(10,30,80);
        let wave = map(noise(y * 0.02 + oceanOffset), 0, 1, -10, 10);
        AudioListener(0, y + wave, width, y + wave);
    }   }