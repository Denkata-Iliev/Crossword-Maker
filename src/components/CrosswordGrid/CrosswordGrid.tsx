import { useEffect, useRef, useState } from "react";
import { CELL_SIZE, type CellType } from "../../types/cell";
import GridCell from "../Cell/GridCell";
import useHeldKeys from "../../hooks/useHeldKeys";

type Props = {
  mode: string;
};

const roundToNearestCell = (value: number) => {
  return Math.round(value / CELL_SIZE) * CELL_SIZE;
};

const initialPlacedCells: CellType[] = [];
const initialAdditionalHoverCellsNumber = 1;

const CrosswordGrid = ({ mode }: Props) => {
  const [placedCells, setPlacedCells] = useState<CellType[]>(initialPlacedCells);
  const [mainHoveredCell, setMainHoveredCell] = useState<CellType | null>(null);
  const boxPlaceAreaRef = useRef<HTMLDivElement | null>(null);
  const { isHeld, isHeldRef } = useHeldKeys(["w", "a", "s", "d"]);
  const [additionalHoverCellsNumber, setAdditionalHoverCellsNumber] = useState(initialAdditionalHoverCellsNumber);

  useEffect(() => {
    setPlacedCells([]);
  }, [mode]);

  useEffect(() => {
    const drawBoxOverCursor = (event: MouseEvent) => {
      const rect = boxPlaceAreaRef.current!.getBoundingClientRect();
      const x = roundToNearestCell(event.clientX - rect.left - CELL_SIZE / 2);
      const y = roundToNearestCell(event.clientY - rect.top - CELL_SIZE / 2);

      setMainHoveredCell({ id: `hovered-${crypto.randomUUID()}`, row: y, col: x });
    };

    const handleMouseWheel = (event: WheelEvent) => {
      const isDirectionHeld = isHeldRef("w") || isHeldRef("a") || isHeldRef("s")|| isHeldRef("d");
      // scroll up
      if (event.deltaY < 0 && isDirectionHeld) {
        event.preventDefault();
        setAdditionalHoverCellsNumber((prev) => prev + 1);
      }

      // scroll down
      if (event.deltaY > 0 && isDirectionHeld) {
        event.preventDefault();
        setAdditionalHoverCellsNumber((prev) => (prev - 1 < 1 ? 1 : prev - 1));
      }
    };

    if (mode === "boxPlace" && boxPlaceAreaRef.current) {
      boxPlaceAreaRef.current.addEventListener("mousemove", drawBoxOverCursor);
      window.addEventListener("wheel", handleMouseWheel, { passive: false });
    }
    
    return () => {      
      boxPlaceAreaRef.current?.removeEventListener("mousemove", drawBoxOverCursor);
      window.removeEventListener("wheel", handleMouseWheel);
    };
  }, [mode]);

  const getHoveredCells = () => {
    if (!mainHoveredCell) return [];

    const hoveredCells = [mainHoveredCell];
    
    if (isHeld("w")) {
      for (let i = initialAdditionalHoverCellsNumber; i <= additionalHoverCellsNumber; i++) {
        hoveredCells.push({ id: `hovered-${crypto.randomUUID()}`, row: mainHoveredCell.row - i * CELL_SIZE, col: mainHoveredCell.col });
      }
    }
    if (isHeld("a")) {
      for (let i = initialAdditionalHoverCellsNumber; i <= additionalHoverCellsNumber; i++) {
        hoveredCells.push({ id: `hovered-${crypto.randomUUID()}`, row: mainHoveredCell.row, col: mainHoveredCell.col - i * CELL_SIZE });
      }
    }
    if (isHeld("s")) {
      for (let i = initialAdditionalHoverCellsNumber; i <= additionalHoverCellsNumber; i++) {
        hoveredCells.push({ id: `hovered-${crypto.randomUUID()}`, row: mainHoveredCell.row + i * CELL_SIZE, col: mainHoveredCell.col });
      }
    }
    if (isHeld("d")) {
      for (let i = initialAdditionalHoverCellsNumber; i <= additionalHoverCellsNumber; i++) {
        hoveredCells.push({ id: `hovered-${crypto.randomUUID()}`, row: mainHoveredCell.row, col: mainHoveredCell.col + i * CELL_SIZE });
      }
    }

    return hoveredCells;
  };

  const handlePlacedCellClick = (e: React.MouseEvent, cellId: string) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();

    if (mode === "boxPlace") {
      setPlacedCells((prev) => prev.filter((c) => c.id !== cellId));
    }
  };

  const handleHoveredCellPlace = (hoveredCells: CellType[]) => {
    // we need to map all hovered cells to a new arr with different ids,
    // so React can differentiate between hovered and placed
    const toPlace = hoveredCells.map((c) => ({ ...c, id: `cell-${crypto.randomUUID()}` }));

    // filter out cells that are already placed to avoid multiple cells on the same place
    const actuallyNewToPlace = toPlace.filter((c) => !placedCells.some((pc) => pc.row === c.row && pc.col === c.col));
    setPlacedCells((prevPlacedCells) => [...prevPlacedCells, ...actuallyNewToPlace]);
  };

  if (mode === "boxPlace") {
    const hoveredCells = getHoveredCells();

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
        {hoveredCells &&
          hoveredCells.map((cell) => (
            <GridCell
              key={cell.id}
              cell={cell}
              onClick={() => handleHoveredCellPlace(hoveredCells)}
              isHovered={true}
            />
          ))}

        {placedCells.map((cell) => (
          <GridCell
            key={cell.id}
            isHovered={false}
            cell={cell}
            onClick={handlePlacedCellClick}
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
