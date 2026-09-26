import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/tasks/:id — update fields on an existing task
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();

  try {
    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        ...(body.title !== undefined ? { title: body.title.trim() } : {}),
        ...(body.notes !== undefined ? { notes: body.notes?.trim() || null } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.priority !== undefined ? { priority: body.priority } : {}),
        ...(body.project !== undefined ? { project: body.project.trim() } : {}),
        ...(body.dueDate !== undefined ? { dueDate: body.dueDate ? new Date(body.dueDate) : null } : {}),
      },
    });
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "That entry could not be found." }, { status: 404 });
  }
}

// DELETE /api/tasks/:id — remove a task from the log
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.task.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "That entry could not be found." }, { status: 404 });
  }
}
