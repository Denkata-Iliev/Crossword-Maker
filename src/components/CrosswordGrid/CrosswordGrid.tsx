import { useEffect, useRef, useState } from "react";
import "./CrosswordGrid.css";

type Props = {
  mode: string;
};

type Cell = {
  id: string;
  row: number;
  col: number;
};

const roundToNearestCell = (value: number) => {
  return Math.round(value / CELL_SIZE) * CELL_SIZE;
};

const CELL_SIZE = 50;
const initialPlacedCells: Cell[] = [];
const CrosswordGrid = ({ mode }: Props) => {
  const [placedCells, setPlacedCells] = useState<Cell[]>(initialPlacedCells);
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
  const boxPlaceAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("Current mode:", mode);
    const drawBoxOverCursor = (event: MouseEvent) => {
      const x = roundToNearestCell(event.clientX);
      const y = roundToNearestCell(event.clientY);
      setHoveredCell({ id: "hovered", row: y, col: x });
    };
    if (mode === "boxPlace" && boxPlaceAreaRef.current) {
      boxPlaceAreaRef.current.addEventListener("mousemove", drawBoxOverCursor);
    }

    return () => {
      if (boxPlaceAreaRef.current) {
        boxPlaceAreaRef.current.removeEventListener("mousemove", drawBoxOverCursor);
      }
    };
  }, [mode]);

  if (mode === "boxPlace") {
    return (
      <div key="box-place" className="crossword-grid-base" ref={boxPlaceAreaRef}>
        {hoveredCell && (
          <div
            onClick={() => setPlacedCells((prev) => [...prev, { ...hoveredCell, id: `cell-${crypto.randomUUID()}` }])}
            key={hoveredCell.id}
            style={{
              position: "absolute",
              left: hoveredCell.col - CELL_SIZE / 2,
              top: hoveredCell.row - CELL_SIZE / 2,
              width: CELL_SIZE,
              height: CELL_SIZE,
              border: "2px solid white",
            }}
          ></div>
        )}
        Box Place Mode
        {placedCells.map((cell) => (
          // steals clicks from hover box, accidentally preventing duplicates on the same coordinates
          <div
            className="placed-cell"
            onClick={(e) => {
              if (e.button !== 0) return; // Only respond to right-clicks
              e.stopPropagation();
              e.preventDefault();

              if (mode === "boxPlace") {
                setPlacedCells((prev) => prev.filter((c) => c.id !== cell.id));
              }
            }}
            key={cell.id}
            style={{
              position: "absolute",
              left: cell.col - CELL_SIZE / 2,
              top: cell.row - CELL_SIZE / 2,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          ></div>
        ))}
      </div>
    );
  }
  return (
    <div key="crossword" className="crossword-grid-base">
      Crossword Grid
    </div>
  );
};

export default CrosswordGrid;
