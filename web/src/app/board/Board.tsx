"use client";
import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import DraggableBlock from "./DraggableBlock";
import DroppableCanvas from "./DroppableCanvas";
import { Block } from "@/types";
import OnBoardBlock from "./OnBoardBlock";
import { useArchitecture } from "@/contexts/ArchitectureContext";

const initialBlocks: Block[] = [
  {
    id: "linear",
    label: "Linear",
    color: "#20FF8F",
    activationFunction: "ReLU",
  },
  { id: "conv", label: "Conv", color: "#FFD620", activationFunction: "ReLU" },
  { id: "rnn", label: "RNN", color: "#FF8C20", activationFunction: "ReLU" },
  { id: "gru", label: "GRU", color: "#FF4920", activationFunction: "ReLU" },
];

const ScratchLikeEditor = () => {
  const { canvasBlocks, setCanvasBlocks } = useArchitecture()!;
  const [activeBlock, setActiveBlock] = useState<Block | null>(null);

  console.log(canvasBlocks);

  const handleDragStart = (event: DragStartEvent) => {
    const { id } = event.active;
    const block =
      (initialBlocks.find((item) => item.id === id) as Block) ||
      (canvasBlocks.find(
        (item: { id: UniqueIdentifier }) => item.id === id
      ) as Block);
    setActiveBlock(block);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (
      over &&
      active.id !== over.id &&
      canvasBlocks.some((block) => block.id === active.id)
    ) {
      const oldIndex = canvasBlocks.findIndex(
        (block) => block.id === active.id
      );
      const newIndex = canvasBlocks.findIndex((block) => block.id === over.id);
      setCanvasBlocks((blocks) => arrayMove(blocks, oldIndex, newIndex));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    // Log the drop position
    console.log("Dropped item over target:", over);

    if (over && over.id === "canvas" && activeBlock) {
      const newBlock = {
        ...activeBlock,
        id: `${activeBlock.id}-${Date.now()}`,
      }; // Ensure unique ID for each new block
      setCanvasBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    }

    setActiveBlock(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-20 p-20">
        {/* Toolbox area */}
        <div className="w-[150px]">
          <h3>Layers</h3>
          <div className="bg-zinc-800 py-1 rounded-lg">
            {initialBlocks.map((block) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                label={block.label}
                color={block.color}
                activationFunction={block.activationFunction}
              />
            ))}
          </div>
        </div>

        {/* Canvas area */}
        <div className="flex-grow">
          <h3>Canvas</h3>
          <DroppableCanvas blocks={canvasBlocks} />
        </div>
      </div>

      <DragOverlay>
        {activeBlock && (
          <OnBoardBlock
            label={activeBlock.label}
            color={activeBlock.color}
            id={activeBlock.id}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default ScratchLikeEditor;