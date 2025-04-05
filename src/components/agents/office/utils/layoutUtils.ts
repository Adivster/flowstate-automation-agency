
import { Division } from '../types/officeTypes';

// Improved overlap detection function with a small buffer
export const checkOverlap = (div1: Division, div2: Division, positions: Record<string, {x: number, y: number}>) => {
  // Get positions from custom positions or default division positions
  const div1Pos = positions[div1.id] || { x: div1.position.x, y: div1.position.y };
  const div2Pos = positions[div2.id] || { x: div2.position.x, y: div2.position.y };
  
  // Calculate edges with a smaller buffer for more precise placement
  const buffer = 0.25;
  
  const div1Left = div1Pos.x - buffer;
  const div1Right = div1Pos.x + div1.position.width + buffer;
  const div1Top = div1Pos.y - buffer;
  const div1Bottom = div1Pos.y + div1.position.height + buffer;
  
  const div2Left = div2Pos.x - buffer;
  const div2Right = div2Pos.x + div2.position.width + buffer;
  const div2Top = div2Pos.y - buffer;
  const div2Bottom = div2Pos.y + div2.position.height + buffer;
  
  // Check if the divisions overlap
  return (
    div1Left < div2Right && 
    div1Right > div2Left && 
    div1Top < div2Bottom && 
    div1Bottom > div2Top
  );
};

// Fix overlapping divisions with an improved algorithm
export const fixOverlaps = (divisions: Division[], positions: Record<string, {x: number, y: number}>) => {
  const fixedPositions = {...positions};
  let overlapsExist = true;
  let iterationCount = 0;
  const maxIterations = 30;
  
  while (overlapsExist && iterationCount < maxIterations) {
    overlapsExist = false;
    iterationCount++;
    
    for (let i = 0; i < divisions.length; i++) {
      for (let j = i + 1; j < divisions.length; j++) {
        const div1 = divisions[i];
        const div2 = divisions[j];
        
        if (checkOverlap(div1, div2, fixedPositions)) {
          overlapsExist = true;
          
          const div1Pos = fixedPositions[div1.id] || { x: div1.position.x, y: div1.position.y };
          const div2Pos = fixedPositions[div2.id] || { x: div2.position.x, y: div2.position.y };
          
          // Calculate the center points of each division
          const div1CenterX = div1Pos.x + (div1.position.width / 2);
          const div1CenterY = div1Pos.y + (div1.position.height / 2);
          
          const div2CenterX = div2Pos.x + (div2.position.width / 2);
          const div2CenterY = div2Pos.y + (div2.position.height / 2);
          
          // Calculate direction to push div2 away from div1
          const dirX = div2CenterX - div1CenterX;
          const dirY = div2CenterY - div1CenterY;
          
          // Determine which axis has the smaller overlap
          const overlapX = Math.min(
            Math.abs(div1Pos.x + div1.position.width - div2Pos.x),
            Math.abs(div2Pos.x + div2.position.width - div1Pos.x)
          );
          
          const overlapY = Math.min(
            Math.abs(div1Pos.y + div1.position.height - div2Pos.y),
            Math.abs(div2Pos.y + div2.position.height - div1Pos.y)
          );
          
          // Adjust position along the axis with smaller overlap
          if (overlapX <= overlapY) {
            // Push horizontally
            const moveAmount = overlapX + 5; // Add a buffer
            const newX = dirX > 0 
              ? Math.min(95 - div2.position.width, div2Pos.x + moveAmount)
              : Math.max(5, div2Pos.x - moveAmount);
              
            fixedPositions[div2.id] = { x: newX, y: div2Pos.y };
          } else {
            // Push vertically
            const moveAmount = overlapY + 5; // Add a buffer
            const newY = dirY > 0
              ? Math.min(85 - div2.position.height, div2Pos.y + moveAmount)
              : Math.max(5, div2Pos.y - moveAmount);
              
            fixedPositions[div2.id] = { x: div2Pos.x, y: newY };
          }
        }
      }
    }
  }
  
  return fixedPositions;
};

// Optimize layout for better visualization and organization
export const optimizeLayout = (divisions: Division[], defaultPositions: Record<string, {x: number, y: number}>) => {
  // Clone default positions to avoid mutating the original
  const optimizedPositions = {...defaultPositions};
  
  // Define logical groupings of divisions
  const logicalGroups = {
    strategy: { x: 15, y: 20 },
    research: { x: 15, y: 55 },
    operations: { x: 55, y: 20 },
    analytics: { x: 55, y: 55 },
    kb: { x: 35, y: 37.5 },
    lounge: { x: 80, y: 37.5 }
  };
  
  // Apply logical groupings
  for (const divId in logicalGroups) {
    if (optimizedPositions[divId]) {
      optimizedPositions[divId] = { ...logicalGroups[divId] };
    }
  }
  
  // Fix any overlaps that might have been created
  return fixOverlaps(divisions, optimizedPositions);
};

// Calculate safe position for new division to avoid overlaps
export const calculateSafePosition = (
  newDivision: Division, 
  existingDivisions: Division[],
  currentPositions: Record<string, {x: number, y: number}>
) => {
  // Start with the proposed position
  let safePosition = { 
    x: newDivision.position.x, 
    y: newDivision.position.y 
  };
  
  // Create a temporary division for overlap checking
  const tempDivision = {
    ...newDivision
  };
  
  // Try to find a position without overlaps
  let attempts = 0;
  let hasOverlap = true;
  const gridSize = 10; // Grid size for positioning
  
  while (hasOverlap && attempts < 100) {
    hasOverlap = false;
    attempts++;
    
    for (const div of existingDivisions) {
      if (div.id !== newDivision.id && checkOverlap(tempDivision, div, {
        ...currentPositions,
        [tempDivision.id]: safePosition
      })) {
        hasOverlap = true;
        
        // Try a new position
        safePosition = {
          x: 10 + (Math.random() * 70),
          y: 10 + (Math.random() * 70)
        };
        
        // Snap to grid
        safePosition.x = Math.round(safePosition.x / gridSize) * gridSize;
        safePosition.y = Math.round(safePosition.y / gridSize) * gridSize;
        
        // Ensure within bounds
        safePosition.x = Math.max(5, Math.min(90 - newDivision.position.width, safePosition.x));
        safePosition.y = Math.max(5, Math.min(80 - newDivision.position.height, safePosition.y));
        break;
      }
    }
  }
  
  return safePosition;
};
