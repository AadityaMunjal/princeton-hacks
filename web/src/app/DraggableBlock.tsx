import { Block } from "@/types";
import { useDraggable } from "@dnd-kit/core";

const DraggableBlock = ({ id, label }: Block) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : "",
      }}
      {...listeners}
      {...attributes}
      className="p-8 m-4 bg-zinc-800 rounded-md text-center cursor-grab"
    >
      {label}
    </div>
  );
};

export default DraggableBlock;