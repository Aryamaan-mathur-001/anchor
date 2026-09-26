"use client";

import { Task, Status, Priority } from "@/lib/types";
import StatusStamp from "./StatusStamp";
import PriorityMark from "./PriorityMark";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function EntryRow({
  task,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onUpdate: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
}) {
  const cycleStatus = () => {
    const order: Status[] = ["OPEN", "IN_PROGRESS", "DONE"];
    const next = order[(order.indexOf(task.status) + 1) % order.length];
    onUpdate(task.id, { status: next });
  };

  return (
    <div className="group grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b border-line py-4 px-1 last:border-b-0">
      <span className="hidden font-display text-sm text-slate/70 sm:block w-24">
        {formatDate(task.createdAt)}
      </span>

      <div className="min-w-0">
        <p className={`truncate font-display text-lg ${task.status === "DONE" ? "text-slate line-through decoration-line" : "text-ink"}`}>
          {task.title}
        </p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-slate">
          <span className="rounded border border-line px-1.5 py-0.5">{task.project}</span>
          {task.dueDate && <span>due {formatDate(task.dueDate)}</span>}
        </div>
      </div>

      <PriorityMark priority={task.priority} />

      <button onClick={cycleStatus} className="transition hover:opacity-70">
        <StatusStamp status={task.status} />
      </button>

      <button
        onClick={() => onDelete(task.id)}
        className="text-xs text-slate opacity-0 transition hover:text-coral group-hover:opacity-100"
        aria-label={`Remove ${task.title}`}
      >
        Remove
      </button>
    </div>
  );
}
