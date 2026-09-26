"use client";

import { useEffect, useMemo, useState } from "react";
import { Task, Status } from "@/lib/types";
import EntryRow from "@/components/EntryRow";
import NewEntryForm from "@/components/NewEntryForm";

const FILTERS: { label: string; value: Status | "ALL" }[] = [
  { label: "All entries", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Underway", value: "IN_PROGRESS" },
  { label: "Closed", value: "DONE" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Status | "ALL">("ALL");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (data: any) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const task = await res.json();
    setTasks((prev) => [task, ...prev]);
  };

  const update = async (id: string, patch: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
  };

  const remove = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  };

  const visible = useMemo(
    () => (filter === "ALL" ? tasks : tasks.filter((t) => t.status === filter)),
    [tasks, filter]
  );

  const counts = useMemo(() => {
    const open = tasks.filter((t) => t.status === "OPEN").length;
    const underway = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const closed = tasks.filter((t) => t.status === "DONE").length;
    return { open, underway, closed, total: tasks.length };
  }, [tasks]);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-14 sm:px-10">
      <header className="mb-10 flex items-end justify-between border-b border-line pb-6">
        <div>
          <h1 className="font-display text-4xl italic text-ink">Anchor</h1>
          <p className="mt-1 text-sm text-slate">A logbook for the work that matters.</p>
        </div>
        <div className="hidden text-right text-xs text-slate sm:block">
          <p>{counts.total} entries logged</p>
          <p>{counts.closed} closed · {counts.underway} underway</p>
        </div>
      </header>

      <section className="mb-8">
        <NewEntryForm onCreate={create} />
      </section>

      <nav className="mb-4 flex gap-4 text-sm">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`border-b-2 pb-1 transition ${
              filter === f.value ? "border-coral text-ink" : "border-transparent text-slate hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </nav>

      <section>
        {loading ? (
          <p className="py-10 text-center text-sm text-slate">Opening the logbook…</p>
        ) : visible.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate">
            Nothing here yet. Log your first entry above.
          </p>
        ) : (
          <div>
            {visible.map((task) => (
              <EntryRow key={task.id} task={task} onUpdate={update} onDelete={remove} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
