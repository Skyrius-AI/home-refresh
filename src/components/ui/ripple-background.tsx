"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface RippleBackgroundProps {
  className?: string;
  containerClassName?: string;
  cellSize?: number;
  rippleDuration?: number;
  children?: React.ReactNode;
}

interface Cell {
  row: number;
  col: number;
  opacity: number;
  delay: number;
}

export function RippleBackground({
  className,
  containerClassName,
  cellSize = 60,
  rippleDuration = 600,
  children,
}: RippleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });
  const [activeCells, setActiveCells] = useState<Cell[]>([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({
          rows: Math.ceil(height / cellSize),
          cols: Math.ceil(width / cellSize),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [cellSize]);

  const triggerRipple = useCallback(
    (originRow: number, originCol: number) => {
      const maxDistance = Math.max(
        dimensions.rows,
        dimensions.cols
      );
      const newCells: Cell[] = [];

      for (let row = 0; row < dimensions.rows; row++) {
        for (let col = 0; col < dimensions.cols; col++) {
          const distance = Math.sqrt(
            Math.pow(row - originRow, 2) + Math.pow(col - originCol, 2)
          );
          const delay = distance * 50;
          const opacity = Math.max(0, 1 - distance / maxDistance);

          newCells.push({ row, col, opacity, delay });
        }
      }

      setActiveCells(newCells);
      setTimeout(() => setActiveCells([]), rippleDuration + maxDistance * 50);
    },
    [dimensions, rippleDuration]
  );

  const handleCellClick = (row: number, col: number) => {
    triggerRipple(row, col);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div
        className={cn(
          "absolute inset-0 grid pointer-events-auto",
          className
        )}
        style={{
          gridTemplateColumns: `repeat(${dimensions.cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${dimensions.rows}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: dimensions.rows * dimensions.cols }).map((_, index) => {
          const row = Math.floor(index / dimensions.cols);
          const col = index % dimensions.cols;
          const activeCell = activeCells.find(
            (c) => c.row === row && c.col === col
          );

          return (
            <div
              key={`${row}-${col}`}
              className="border border-border/5 transition-colors cursor-pointer hover:bg-accent/10"
              onClick={() => handleCellClick(row, col)}
              style={{
                backgroundColor: activeCell
                  ? `hsl(var(--accent) / ${activeCell.opacity * 0.3})`
                  : undefined,
                transitionDelay: activeCell ? `${activeCell.delay}ms` : "0ms",
                transitionDuration: `${rippleDuration}ms`,
              }}
            />
          );
        })}
      </div>
      <div className="relative z-10 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
