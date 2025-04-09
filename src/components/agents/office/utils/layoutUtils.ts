
import { Division, ZIndexLayers } from '../types/officeTypes';

// Improved overlap detection with better precision
export const checkOverlap = (div1: Division, div2: Division, positions: Record<string, {x: number, y: number}>) => {
  // Get positions from custom positions or default division positions
  const div1Pos = positions[div1.id] || { x: div1.position.x, y: div1.position.y };
  const div2Pos = positions[div2.id] || { x: div2.position.x, y: div2.position.y };
  
  // Increase buffer to ensure at least 2 grid squares (10%) spacing
  const buffer = 10;
  
  // Calculate edges with buffer
  const div1Left = div1Pos.x - buffer;
  const div1Right = div1Pos.x + div1.position.width + buffer;
  const div1Top = div1Pos.y - buffer;
  const div1Bottom = div1Pos.y + div1.position.height + buffer;
  
  const div2Left = div2Pos.x - buffer;
  const div2Right = div2Pos.x + div2.position.width + buffer;
  const div2Top = div2Pos.y - buffer;
  const div2Bottom = div2Pos.y + div2.position.height + buffer;
  
  // Check for overlap with improved precision
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
  const maxIterations = 100; // Increase max iterations for better results
  
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
          
          // Determine which axis has the smaller overlap and use that for movement
          const overlapX = Math.min(
            Math.abs(div1Pos.x + div1.position.width - div2Pos.x),
            Math.abs(div2Pos.x + div2.position.width - div1Pos.x)
          );
          
          const overlapY = Math.min(
            Math.abs(div1Pos.y + div1.position.height - div2Pos.y),
            Math.abs(div2Pos.y + div2.position.height - div1Pos.y)
          );
          
          // Use a larger push amount to ensure at least 2 grid squares (10%) spacing
          const pushAmount = Math.max(overlapX, overlapY) + 10;
          
          // Adjust position along the axis with smaller overlap
          if (overlapX <= overlapY) {
            // Push horizontally
            const moveAmount = pushAmount;
            const newX = dirX > 0 
              ? Math.min(95 - div2.position.width, div2Pos.x + moveAmount)
              : Math.max(5, div2Pos.x - moveAmount);
              
            fixedPositions[div2.id] = { x: newX, y: div2Pos.y };
          } else {
            // Push vertically
            const moveAmount = pushAmount;
            const newY = dirY > 0
              ? Math.min(85 - div2.position.height, div2Pos.y + moveAmount)
              : Math.max(5, div2Pos.y - moveAmount);
              
            fixedPositions[div2.id] = { x: div2Pos.x, y: newY };
          }
        }
      }
    }
  }
  
  // Add a final pass to ensure divisions are within boundaries
  for (const divId in fixedPositions) {
    const division = divisions.find(d => d.id === divId);
    if (!division) continue;
    
    fixedPositions[divId] = {
      x: Math.max(0, Math.min(100 - division.position.width, fixedPositions[divId].x)),
      y: Math.max(0, Math.min(100 - division.position.height, fixedPositions[divId].y))
    };
  }
  
  return fixedPositions;
};

// Optimize layout for better visualization and organization
export const optimizeLayout = (divisions: Division[], defaultPositions: Record<string, {x: number, y: number}>) => {
  // Define ideal positions with better spacing (at least 2 grid squares apart)
  const idealPositions = {
    kb: { x: 10, y: 15 },
    analytics: { x: 60, y: 15 },
    operations: { x: 10, y: 55 },
    strategy: { x: 60, y: 55 },
    research: { x: 35, y: 35 },
    lounge: { x: 78, y: 35 }
  };
  
  // Apply ideal positioning
  let optimizedPositions = {...idealPositions};
  
  // Fix any remaining overlaps
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
  const gridSize = 10; // Increase grid size to 10% (2 grid squares) for better spacing
  
  while (hasOverlap && attempts < 200) { // More attempts for better placement
    hasOverlap = false;
    attempts++;
    
    for (const div of existingDivisions) {
      if (div.id !== newDivision.id && checkOverlap(tempDivision, div, {
        ...currentPositions,
        [tempDivision.id]: safePosition
      })) {
        hasOverlap = true;
        
        // Try positions in a more structured way
        // Start from center and spiral outward with larger jumps
        const centerX = 50;
        const centerY = 50;
        const radius = Math.floor(attempts / 8) * 10; // Increase radius by 10% every 8 attempts
        const angle = (attempts % 8) * Math.PI / 4; // 8 directions
        
        safePosition = {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
        };
        
        // Snap to grid
        safePosition.x = Math.round(safePosition.x / gridSize) * gridSize;
        safePosition.y = Math.round(safePosition.y / gridSize) * gridSize;
        
        // Ensure within bounds
        safePosition.x = Math.max(5, Math.min(95 - newDivision.position.width, safePosition.x));
        safePosition.y = Math.max(5, Math.min(85 - newDivision.position.height, safePosition.y));
        
        break;
      }
    }
  }
  
  return safePosition;
};

// Calculate optimal position for a new division, considering existing layout
export const calculateOptimalPosition = (
  divisions: Division[],
  currentPositions: Record<string, {x: number, y: number}>
) => {
  // Define grid parameters with larger spacing
  const gridCellWidth = 30; // Larger cells for better spacing
  const gridCellHeight = 30;
  const gridCols = 3;
  const gridRows = 3;
  
  // Create a grid representation
  const grid = Array(gridRows).fill(0).map(() => Array(gridCols).fill(0));
  
  // Mark occupied grid cells and their buffer zones
  divisions.forEach(div => {
    const pos = currentPositions[div.id] || { x: div.position.x, y: div.position.y };
    // Expand the area to include buffer zones (2 grid squares)
    const startCol = Math.max(0, Math.floor((pos.x - 10) / gridCellWidth));
    const endCol = Math.min(gridCols - 1, Math.floor((pos.x + div.position.width + 10) / gridCellWidth));
    const startRow = Math.max(0, Math.floor((pos.y - 10) / gridCellHeight));
    const endRow = Math.min(gridRows - 1, Math.floor((pos.y + div.position.height + 10) / gridCellHeight));
    
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        grid[row][col] = 1;
      }
    }
  });
  
  // Find the first empty cell
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      if (grid[row][col] === 0) {
        return {
          x: col * gridCellWidth + 5,
          y: row * gridCellHeight + 5
        };
      }
    }
  }
  
  // If no empty cell, return a default position
  return { x: 50, y: 50 };
};

