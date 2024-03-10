let myPoint;
let plot;
let canvasBoundary;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent('canvas-container'); // Make canvas a child of 'canvas-container' div
  plot = new Plot(10);
  plot.printPlot();
  canvasBoundary = canvas.position(); // Get the position of the canvas
}

function draw() {
    background(240);
    
    // Display the plot
    plot.displayPlot();
    
    // Check if mouse is within canvas boundaries
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      // Create and display myPoint
      myPoint = new Point(mouseX, mouseY);
      myPoint.drawPoint();
      
      // Draw connections from myPoint to plot points
      plot.drawToRadius(myPoint, 200);
    }
  }

function mouseIsInsideCanvas() {
  return mouseX >= canvasBoundary.x && mouseX <= canvasBoundary.x + width &&
         mouseY >= canvasBoundary.y && mouseY <= canvasBoundary.y + height;
}

class Plot {
  
  /**
  *  The number of points in the plot
  */
  constructor(numberOfPoints) {
    this.numberOfPoints = numberOfPoints;
    this.plot = [];
    this.assignPositions();
  }
  
  /**
  *  Will display the plot of points after point assignments
  */
  displayPlot() {
    stroke(0);
    strokeWeight(5);
    for (let i = 0; i < this.numberOfPoints; i++) {
      point(this.plot[i].x, this.plot[i].y);
    }
  }
  
  /**
  *  Display closest point
  */
  nearestNeighbor(p) {
    let q = this.findClosestPoint(p);
    stroke(0);
    strokeWeight(2);
    line(p.x, p.y, q.x, q.y);
  }
  
  /**
  *  Given a point, will connect points in the radius of
  *  of that point. Radius is a parameter float
  */
  drawToRadius(p, radius) {
    let distanceList = this.distances(p);
    for (let i = 0; i < distanceList.length; i++) {
      if (distanceList[i] <= radius) {
        stroke(0);
        strokeWeight(1);
        line(p.x, p.y, this.plot[i].x, this.plot[i].y);
      }
    }
  }
  
  /**
  *  Given a Point, will find the closest Point
  */
  findClosestPoint(p) {
    let distanceList = this.distances(p);
    let minimum = distanceList[0];
    let index = 0;
    for (let i = 0; i < distanceList.length; i++) {
      if (minimum > distanceList[i] && minimum !== 0 ) {
        minimum = distanceList[i];
        index = i;
      }
    }
    return this.plot[index];
  }
  
  /**
  *  Given a Point, Returns an array of distances 
  *  from that Point
  */
  distances(p) {
    let distances = [];
    for (let i = 0; i < this.numberOfPoints; i++) {
      distances[i] = this.distance(p, this.plot[i]);
    }
    return distances;
  }
  
  /**
  *  Given two Points, will caclulate 
  *  the distance between them
  */
  distance(p, q) {
    return sqrt(pow(abs(q.x - p.x), 2) + pow(abs(q.y - p.y), 2));
  }
  
  /**
  *  Method to assign positions of the points
  */
  assignPositions() {
    for (let i = 0; i < this.numberOfPoints; i++) {
      let x = int(random(width));
      let y = int(random(height));
      this.plot[i] = createVector(x, y);
    }
  }
  
  /**
  *  Prints the plot of points to console after assignment
  */
  printPlot() {
    this.assignPositions();
    for (let i = 0; i < this.numberOfPoints; i++) {
      console.log(this.plot[i].x, this.plot[i].y);
    }
  }
  
}

class Point {
  /**
  * This is the x value for the point
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  /**
  * Draws point at given x and y values
  */
  drawPoint() {
    stroke(255, 0, 0);
    strokeWeight(5);
    point(this.x, this.y);
  }
  
}
