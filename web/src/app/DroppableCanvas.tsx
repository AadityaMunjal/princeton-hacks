import { useDroppable } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import SortableBlock from "./SortableBlock";
import { Block } from "@/types";

const DroppableCanvas = ({ blocks }: { blocks: Block[] }) => {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className="flex h-full border-2 border-dashed border-zinc-600 p-8 bg-zinc-900 whitespace-nowrap z-10"
    >
      <SortableContext
        items={blocks.map((block: Block) => block.id)}
        strategy={horizontalListSortingStrategy}
      >
        {blocks.map((block) => (
          <SortableBlock
            key={block.id}
            id={block.id}
            label={block.label}
            color={block.color}
          />
        ))}
      </SortableContext>
      {/* <div className="h-10 pointer-events-none" /> Spacer at the bottom */}
    </div>
  );
};

export default DroppableCanvas;