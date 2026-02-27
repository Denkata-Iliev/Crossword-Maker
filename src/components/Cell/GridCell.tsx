import React from "react";
import { CELL_SIZE, type CellType } from "../../types/cell";

type CellProps = {
  cell: CellType;
  onClick: (e: React.MouseEvent, cellId: string) => void;
  isHovered: boolean;
};

const GridCell = ({ cell, onClick, isHovered }: CellProps) => {
  const className = isHovered
    ? "absolute border-2 border-blue-400 bg-blue-100/50 dark:border-blue-500 dark:bg-blue-900/30 rounded-sm shadow-md"
    : "absolute crossword-cell-placed cursor-pointer transition-all duration-200 hover:border-red-400 hover:bg-red-50 dark:hover:border-red-500 dark:hover:bg-red-900/20 hover:shadow-lg rounded-sm";
  return (
    <div
      key={cell.id}
      className={className}
      onClick={(e) => onClick(e, cell.id)}
      style={{
        left: cell.col - CELL_SIZE / 2,
        top: cell.row - CELL_SIZE / 2,
        width: CELL_SIZE,
        height: CELL_SIZE,
      }}
    ></div>
  );
};

export default GridCell;
