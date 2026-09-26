import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/tasks — list all tasks, newest first, optionally filtered by status/project
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const project = searchParams.get("project");

  const tasks = await prisma.task.findMany({
    where: {
      ...(status ? { status: status as any } : {}),
      ...(project ? { project } : {}),
    },
    orderBy: [{ createdAt: "desc" }],
  });

  return NextResponse.json(tasks);
}

// POST /api/tasks — create a new task
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
    return NextResponse.json({ error: "A title is required to log a task." }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title: body.title.trim(),
      notes: body.notes?.trim() || null,
      status: body.status ?? "OPEN",
      priority: body.priority ?? "MEDIUM",
      project: body.project?.trim() || "General",
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
    },
  });

  return NextResponse.json(task, { status: 201 });
}
