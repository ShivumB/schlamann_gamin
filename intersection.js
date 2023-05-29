function checkCollision(x1, y1, width1, height1, angle1, x2, y2, width2, height2) {
  // Convert angle1 to radians
  var angleRad = angle1 * Math.PI / 180;

  // Calculate the half width and height of rect1
  var halfWidth1 = width1 / 2;
  var halfHeight1 = height1 / 2;

  // Calculate the center coordinates of rect1
  var centerX1 = x1;
  var centerY1 = y1;

  // Calculate the rotated coordinates of the corners of rect1
  var topLeftX1 = centerX1 + Math.cos(angleRad) * (-halfWidth1) - Math.sin(angleRad) * (-halfHeight1);
  var topLeftY1 = centerY1 + Math.sin(angleRad) * (-halfWidth1) + Math.cos(angleRad) * (-halfHeight1);

  var topRightX1 = centerX1 + Math.cos(angleRad) * halfWidth1 - Math.sin(angleRad) * (-halfHeight1);
  var topRightY1 = centerY1 + Math.sin(angleRad) * halfWidth1 + Math.cos(angleRad) * (-halfHeight1);

  var bottomLeftX1 = centerX1 + Math.cos(angleRad) * (-halfWidth1) - Math.sin(angleRad) * halfHeight1;
  var bottomLeftY1 = centerY1 + Math.sin(angleRad) * (-halfWidth1) + Math.cos(angleRad) * halfHeight1;

  var bottomRightX1 = centerX1 + Math.cos(angleRad) * halfWidth1 - Math.sin(angleRad) * halfHeight1;
  var bottomRightY1 = centerY1 + Math.sin(angleRad) * halfWidth1 + Math.cos(angleRad) * halfHeight1;

  // Calculate the bounds of rect1
  var minX1 = Math.min(topLeftX1, topRightX1, bottomLeftX1, bottomRightX1);
  var maxX1 = Math.max(topLeftX1, topRightX1, bottomLeftX1, bottomRightX1);
  var minY1 = Math.min(topLeftY1, topRightY1, bottomLeftY1, bottomRightY1);
  var maxY1 = Math.max(topLeftY1, topRightY1, bottomLeftY1, bottomRightY1);

  // Calculate the bounds of rect2
  var minX2 = x2 - width2 / 2;
  var maxX2 = x2 + width2 / 2;
  var minY2 = y2 - height2 / 2;
  var maxY2 = y2 + height2 / 2;

  // Check for overlap in the x and y axes
  var overlapX = !(maxX1 < minX2 || minX1 > maxX2);
  var overlapY = !(maxY1 < minY2 || minY1 > maxY2);

  // Return true if there is overlap in both axes (collision), false otherwise
  return overlapX && overlapY;
}