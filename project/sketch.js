let bgGif;
let mapImg;

let factory, city, ocean, forest, barn;

let icons = [];

function preload() {
  bgGif = loadImage("assets/animated_bg.gif");
  mapImg = loadImage("assets/background.png");

  factory = loadImage("assets/factory_tight.png");
  city = loadImage("assets/city_tight.png");
  ocean = loadImage("assets/beach_palm_tight.png");
  forest = loadImage("assets/forest_stumps_tight.png");
  barn = loadImage("assets/cow_tight.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");

  icons = [
    { img: factory, x: 0.111, y: 0.077, scale: 0.647, link: "factory.html", label: "Industrial Emissions" },
    { img: city, x: 0.42, y: 0.39, scale: 0.8, link: "city.html", label: "Urban Pollution" },
    { img: ocean, x: 0.152, y: 0.5972, scale: 0.83, link: "ocean.html", label: "Ocean Contamination" },
    { img: forest, x: 0.685, y: 0.64, scale: 0.83, link: "forest.html", label: "Deforestation" },
    { img: barn, x: 0.538, y: 0.1, scale: 0.893, link: "barn.html", label: "Agriculture & Methane" }
  ];
}

function draw() {
  background(0);

  let mapRatio = mapImg.width / mapImg.height;
  let screenRatio = width / height;

  let drawWidth, drawHeight;

  if (screenRatio > mapRatio) {
    drawHeight = height;
    drawWidth = height * mapRatio;
  } else {
    drawWidth = width;
    drawHeight = width / mapRatio;
  }

  let offsetX = (width - drawWidth) / 2;
  let offsetY = (height - drawHeight) / 2;

  image(bgGif, 0, 0, width, height);
  image(mapImg, offsetX, offsetY, drawWidth, drawHeight);

  for (let icon of icons) {
    drawIcon(icon, offsetX, offsetY, drawWidth, drawHeight);
  }
}

function drawIcon(icon, offsetX, offsetY, mapWidth, mapHeight) {

  let img = icon.img;

  let baseWidth = img.width * icon.scale;
  let baseHeight = img.height * icon.scale;

  let x = offsetX + mapWidth * icon.x;
  let y = offsetY + mapHeight * icon.y;

  let hovering =
    mouseX > x &&
    mouseX < x + baseWidth &&
    mouseY > y &&
    mouseY < y + baseHeight;

  if (hovering) {
    cursor(HAND);

    noStroke();
    fill(255, 230, 0, 90);
    ellipse(
      x + baseWidth / 2,
      y + baseHeight / 2,
      baseWidth * 1.3,
      baseHeight * 1.3
    );

    tint(255, 255);
    image(img, x, y, baseWidth, baseHeight);
    noTint();

  } else {
    tint(255, 35);
    image(img, x, y, baseWidth, baseHeight);
    noTint();
  }
}

function mousePressed() {

  let mapRatio = mapImg.width / mapImg.height;
  let screenRatio = width / height;

  let drawWidth, drawHeight;

  if (screenRatio > mapRatio) {
    drawHeight = height;
    drawWidth = height * mapRatio;
  } else {
    drawWidth = width;
    drawHeight = width / mapRatio;
  }

  let offsetX = (width - drawWidth) / 2;
  let offsetY = (height - drawHeight) / 2;

  for (let icon of icons) {

    let baseWidth = icon.img.width * icon.scale;
    let baseHeight = icon.img.height * icon.scale;

    let x = offsetX + drawWidth * icon.x;
    let y = offsetY + drawHeight * icon.y;

    if (
      mouseX > x &&
      mouseX < x + baseWidth &&
      mouseY > y &&
      mouseY < y + baseHeight
    ) {
      window.location.href = icon.link;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}