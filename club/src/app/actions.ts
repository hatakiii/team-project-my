"use server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { todos } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function getDB() {
  const env = getRequestContext().env;
  return drizzle(env.DB);
}

export async function addTodo(formData: FormData) {
  const task = formData.get("task") as string;
  const db = await getDB();
  await db.insert(todos).values({ task }).run();
  revalidatePath("/"); // Хуудсыг шинэчилж шинэ датаг харуулна
}

export async function deleteTodo(id: number) {
  const db = await getDB();
  await db.delete(todos).where(eq(todos.id, id)).run();
  revalidatePath("/");
}
