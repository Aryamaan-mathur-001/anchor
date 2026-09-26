import { Priority } from "@/lib/types";

const CONFIG: Record<Priority, { label: string; dots: number }> = {
  LOW: { label: "Low", dots: 1 },
  MEDIUM: { label: "Medium", dots: 2 },
  HIGH: { label: "High", dots: 3 },
};

export default function PriorityMark({ priority }: { priority: Priority }) {
  const { label, dots } = CONFIG[priority];
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate" title={`${label} priority`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i < dots ? "bg-coral" : "bg-line"}`}
        />
      ))}
      <span className="ml-1">{label}</span>
    </span>
  );
}
