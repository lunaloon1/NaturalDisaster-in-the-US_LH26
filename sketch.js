/* let currentScene = "map";
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
    }   } */

/*let table;
let damage, state, incidentStartDate;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  table = await loadTable('/DATA/califire2.csv',',','header');
  console.log(table);
  damage = table.getColumn(2)
  state = table.getColumn(8)
incidentStartDate = table.getColumn(16)
}

function draw() {
  background(220);
  if (table){
    for (let i = 0; i < table.getRowCount(); i++){
        let textX = random(width);
        let textY = random(height);
        let scale = width * 0.01;
      
        //noStroke();
        fill(255); 
        circle(textX, textY, state[i]*scale);

        textAlign(CENTER, CENTER);
        fill(0);
        text(damage[i], textX, textY);
        

    }   }
    noLoop();
}
*/
let table;
let circles = [];
let cols = 6; 
let circleSize = 60;
let spacing = 120;
let hoveredCircle = null;
let clickedCircle = null;
let font;

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');

  // Load CSV from the project folder
  // Make sure the file is named exactly "califire2.csv" (case-sensitive)
  table = loadTable('califire2.csv', ',', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(16);
  textAlign(CENTER, CENTER);

  let damageNumbers = [];

  if (table && table.getRowCount() > 0) {
    let damageCol = table.getColumn(2); // column with damage
    for (let d of damageCol) {
      let n = parseFloat(d);
      damageNumbers.push(isNaN(n) ? 0 : n);
    }
  } else {
    // Fallback data if CSV fails
    damageNumbers = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
  }

  // Sort indices high → low
  let sortedIndices = damageNumbers
    .map((val, idx) => ({ val, idx }))
    .sort((a, b) => b.val - a.val)
    .map(o => o.idx);

  for (let i = 0; i < sortedIndices.length; i++) {
    let idx = sortedIndices[i];
    let col = i % cols;
    let row = floor(i / cols);
    let x = col * spacing + spacing / 2 + 50;
    let y = row * spacing + spacing / 2 + 50;

    let severity = damageNumbers[idx] / max(damageNumbers);
    let colColor = lerpColor(color(255, 220, 180), color(255, 140, 0), severity);

    circles.push({
      x: x,
      y: y,
      baseX: x,
      baseY: y,
      size: circleSize,
      damage: damageNumbers[idx],
      severity: severity,
      color: colColor,
      angleOffset: random(TWO_PI)
    });
  }
}

function draw() {
  // Dark blue gradient background
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(10, 20, 40), color(20, 40, 80), inter);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();

  hoveredCircle = null;

  for (let c of circles) {
    let d = dist(mouseX, mouseY, c.x, c.y);
    if (d < c.size / 2) hoveredCircle = c;

    let hoverScale = 1;
    if (hoveredCircle === c && clickedCircle !== c) {
      hoverScale = 1.1;
      c.color = lerpColor(color(255, 140, 0), color(200, 100, 0), 0.3);
    } else {
      c.color = lerpColor(color(255, 220, 180), color(255, 140, 0), c.severity);
    }

    let hoverAnim = 0;
    if (hoveredCircle === c && clickedCircle !== c) hoverAnim = 5 * sin(frameCount * 0.1 + c.angleOffset);

    if (clickedCircle === c) {
      c.x = lerp(c.x, width / 2, 0.1);
      c.y = lerp(c.y, height / 2, 0.1);
      hoverScale = lerp(hoverScale, 2.0, 0.1);
    } else {
      c.x = c.baseX;
      c.y = c.baseY + hoverAnim;
    }

    push();
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = 'rgba(0,0,0,0.5)';
    fill(c.color);
    ellipse(c.x, c.y, c.size * hoverScale);
    pop();

    fill(0);
    text(c.damage, c.x, c.y);
  }

  if (clickedCircle) {
    push();
    fill(0, 80);
    rect(0, 0, width, height);
    pop();
  }
}

function mousePressed() {
  if (hoveredCircle) clickedCircle = hoveredCircle;
}

function mouseReleased() {
  clickedCircle = null;
}
