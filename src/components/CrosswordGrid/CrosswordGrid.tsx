import { useEffect, useRef, useState } from "react";
import { CELL_SIZE, type CellType } from "../../types/cell";
import GridCell from "../Cell/GridCell";

type Props = {
  mode: string;
};

const roundToNearestCell = (value: number) => {
  return Math.round(value / CELL_SIZE) * CELL_SIZE;
};

const initialPlacedCells: CellType[] = [];

const CrosswordGrid = ({ mode }: Props) => {
  const [placedCells, setPlacedCells] = useState<CellType[]>(initialPlacedCells);
  const [hoveredCell, setHoveredCell] = useState<CellType | null>(null);
  const boxPlaceAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPlacedCells([]);
    setHoveredCell(null);
  }, [mode]);

  useEffect(() => {
    const drawBoxOverCursor = (event: MouseEvent) => {
      const rect = boxPlaceAreaRef.current!.getBoundingClientRect();
      const x = roundToNearestCell(event.clientX - rect.left - (CELL_SIZE / 2));
      const y = roundToNearestCell(event.clientY - rect.top - (CELL_SIZE / 2));
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
      <div
        key="box-place"
        className="crossword-grid-container w-full h-full mt-12 mr-20 bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 relative overflow-hidden"
        ref={boxPlaceAreaRef}
        style={{
          backgroundImage: "repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)",
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
      >
        {hoveredCell && (
          <GridCell
            cell={hoveredCell}
            onClick={() => setPlacedCells((prev) => [...prev, { ...hoveredCell, id: `cell-${crypto.randomUUID()}` }])}
            isHovered={true}
          />
        )}
        
        {placedCells.map((cell) => (
          <GridCell
            key={cell.id}
            isHovered={false}
            cell={cell}
            onClick={(e, cellId) => {
              if (e.button !== 0) return;
              e.stopPropagation();
              e.preventDefault();

              if (mode === "boxPlace") {
                setPlacedCells((prev) => prev.filter((c) => c.id !== cellId));
              }
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <div
      key="crossword"
      className="crossword-grid-container w-full h-full mt-12 mr-20 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center"
    >
      <div className="text-2xl font-semibold text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-slate-800/90 px-6 py-4 rounded-xl backdrop-blur-sm border border-white/20 dark:border-slate-600/50 shadow-lg">
        Crossword Grid
      </div>
    </div>
  );
};

export default CrosswordGrid;
