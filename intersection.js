function checkCollision(x1, y1, width1, height1, angle1, x2, y2, width2, height2) {
  // Convert angles to radians
  const angle1Rad = (angle1 * Math.PI) / 180;

  // Calculate half-width and half-height of each rectangle
  const halfWidth1 = width1 / 2;
  const halfHeight1 = height1 / 2;
  const halfWidth2 = width2 / 2;
  const halfHeight2 = height2 / 2;

  // Calculate the center point of each rectangle
  const center1X = x1;
  const center1Y = y1;
  const center2X = x2;
  const center2Y = y2;

  // Calculate the rotated coordinates of each rectangle
  const cosAngle = Math.cos(angle1Rad);
  const sinAngle = Math.sin(angle1Rad);

  const rotatedX1 = cosAngle * (center1X - x1) - sinAngle * (center1Y - y1) + x1;
  const rotatedY1 = sinAngle * (center1X - x1) + cosAngle * (center1Y - y1) + y1;

  const rotatedX2 = cosAngle * (center2X - x2) - sinAngle * (center2Y - y2) + x2;
  const rotatedY2 = sinAngle * (center2X - x2) + cosAngle * (center2Y - y2) + y2;

  // Calculate the distance between the centers of the rectangles
  const dx = Math.abs(rotatedX2 - rotatedX1);
  const dy = Math.abs(rotatedY2 - rotatedY1);

  // Check for collision
  if (dx <= halfWidth1 + halfWidth2 && dy <= halfHeight1 + halfHeight2) {
    return true;
  }

  return false;
}
