"use client";

import { useState } from "react";
import { Priority } from "@/lib/types";

export default function NewEntryForm({
  onCreate,
}: {
  onCreate: (data: { title: string; project: string; priority: Priority; dueDate: string | null }) => void;
}) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({
      title: title.trim(),
      project: project.trim() || "General",
      priority,
      dueDate: dueDate || null,
    });
    setTitle("");
    setProject("");
    setPriority("MEDIUM");
    setDueDate("");
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="mb-1 block text-xs text-slate">What needs doing?</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Log a new entry…"
          className="w-full border-b border-line bg-transparent py-1.5 font-display text-lg placeholder:text-slate/50 focus:border-coral"
        />
      </div>
      <div className="w-full sm:w-40">
        <label className="mb-1 block text-xs text-slate">Project</label>
        <input
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="General"
          className="w-full border-b border-line bg-transparent py-1.5 text-sm placeholder:text-slate/50 focus:border-coral"
        />
      </div>
      <div className="w-full sm:w-32">
        <label className="mb-1 block text-xs text-slate">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="w-full border-b border-line bg-transparent py-1.5 text-sm focus:border-coral"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
      <div className="w-full sm:w-36">
        <label className="mb-1 block text-xs text-slate">Due</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border-b border-line bg-transparent py-1.5 text-sm focus:border-coral"
        />
      </div>
      <button
        type="submit"
        className="rounded bg-ink px-4 py-2 text-sm font-medium text-cream transition hover:bg-teal"
      >
        Log entry
      </button>
    </form>
  );
}
