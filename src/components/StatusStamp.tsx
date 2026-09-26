import { Status } from "@/lib/types";

const LABEL: Record<Status, string> = {
  OPEN: "Open",
  IN_PROGRESS: "Underway",
  DONE: "Closed",
};

const STYLE: Record<Status, string> = {
  OPEN: "border-slate/40 text-slate",
  IN_PROGRESS: "border-coral text-coral",
  DONE: "border-teal text-teal",
};

export default function StatusStamp({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${STYLE[status]}`}
    >
      {LABEL[status]}
    </span>
  );
}
