function drawWobblyLine(start_x, start_y, end_x, end_y) {
  let x_diff = end_x - start_x;
  let x_incr = x_diff / 100;

  let y_diff = end_y - start_y;
  let y_incr = y_diff / 100;

  let cur_x = start_x + x_diff;
  let cur_y = start_y + y_incr;
  for (let i = 0; i < 100; i++) {
    let next_x = randomGaussian(cur_x + x_incr);
    let next_y = randomGaussian(cur_y + y_incr);
    strokeWeight(randomGaussian(2) + 1);
    line(cur_x, cur_y, next_x, next_y);
    cur_x = next_x;
    cur_y = next_y;
  }
}

function drawHatchedLine(start_x, start_y, end_x, end_y) {
  let x_diff = end_x - start_x;
  let x_incr = x_diff / 100;

  let y_diff = end_y - start_y;
  let y_incr = y_diff / 50;

  let cur_x = start_x;
  let cur_y = start_y;
  for (let i = 0; i < 50; i++) {
    let next_x = cur_x + x_incr;
    let next_y = cur_y + y_incr;
    strokeWeight(1);
    let cur_x_tip = cur_x;
    let cur_y_tip = cur_y;
    for (let j = 0; j < 5; j++) {
      let next_x_tip = randomGaussian(cur_x_tip + j);
      let next_y_tip = randomGaussian();
      line(cur_x_tip, cur_y + next_y_tip, next_x_tip, cur_y + next_y_tip);
      cur_x_tip = next_x_tip;
      cur_y_tip = next_y_tip;
    }

    cur_x = next_x;
    cur_y = next_y;
  }
}

function LenThroughArray(points) {
  if (points.length < 2) {
    return 0;
  }
  let len = 0;
  let vec1 = points[0];
  for (let i = 1; i < points.length; i++) {
    let vec2 = points[i];
    len += vec1.dist(vec2);
    vec1 = vec2;
  }
  return len;
}

function DrawSquiggle(start_x, start_y, radiuus, length) {
  let current_length = 0;
  let current_angle = 0;
  let points = [];
  while (current_length <= length) {
    let new_x = start_x + radiuus * cos(current_angle);
    let new_y = start_y + radiuus * sin(current_angle);
    append(points, createVector(new_x, new_y));
    current_length = LenThroughArray(points);
    current_angle += random(1, 5);
    radiuus += random(-3, 3);
  }
  beginShape();
  curveVertex(points[0].x, points[0].y);
  for (let i = 0; i < points.length; i++) {
    curveVertex(points[i].x, points[i].y);
  }
  curveVertex(points[points.length - 1].x, points[points.length - 1].y);
  endShape();
}

