let canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;
  drawLinesFromDB();
});

// canvas drawing gets erased on window resize ???

// a context object which provides fun for 2d drawing
let ctx = canvas.getContext("2d");

let linesDB = [];
let redoLinesDB = [];
let isPenDown = false;
let line = [];

canvas.addEventListener("mousedown", function (e) {
  if (redoLinesDB.length) {
    redoLinesDB = [];
  }
  console.log("Inside mouse down");
  isPenDown = true;
  let x = e.clientX;

  let y = e.clientY - 100;
  console.log(e.clientX);
  ctx.beginPath();
  ctx.moveTo(x, y);

  let pointObject = {
    x: x,
    y: y,
    type: "md",
    lineWidth: ctx.lineWidth,
    strokeStyle: ctx.strokeStyle,
  };
  line.push(pointObject);
});
canvas.addEventListener("touchstart",function (e) {
  if (redoLinesDB.length) {
    redoLinesDB = [];
  }
  console.log("Inside touchstart");
  isPenDown = true;
  let x = e.touches[0].clientX ;
  let y = e.touches[0].clientY - 100;
  ctx.beginPath();
  ctx.moveTo(x, y);

  let pointObject = {
    x: x,
    y: y,
    type: "md",
    lineWidth: ctx.lineWidth,
    strokeStyle: ctx.strokeStyle,
  };
  line.push(pointObject);
});

canvas.addEventListener("mousemove", function (e) {
  if (isPenDown) {
    console.log("Inside mousemove");
    let x = e.clientX;
    let y = e.clientY - 100;
    ctx.lineTo(x, y);
    ctx.stroke();
  
    let pointObject = {
      x: x,
      y: y,
      type: "mm",
    };
    line.push(pointObject);
  }
});

canvas.addEventListener("touchmove", function (e) {
  if (isPenDown) {
    console.log("Inside touchmove");
    let x = e.touches[0].clientX ;
    let y = e.touches[0].clientY - 100;
    ctx.lineTo(x, y);
    ctx.stroke();
    console.log(x);

    let pointObject = {
      x: x,
      y: y,
      type: "mm",
    };
    line.push(pointObject);
  }
});

canvas.addEventListener("mouseup", function (e) {
  console.log("mouseup");
  isPenDown = false;

  linesDB.push(line);
  line = [];

  console.log(linesDB);
});
canvas.addEventListener("touchend", function (e) {
  console.log("touchend");
  isPenDown = false;

  linesDB.push(line);
  line = [];

  console.log(linesDB);
});
