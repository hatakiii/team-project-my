import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { todos } from "@/db/schema";
import { addTodo, deleteTodo } from "./actions";

export const runtime = "edge";

export default async function Home() {
  const context = getRequestContext() as unknown as { env: CloudflareEnv };
  const env = context.env;

  // DB холболт шалгах
  if (!env?.DB) {
    return (
      <div className="p-10 text-red-500">
        D1 Database олдсонгүй! wrangler.toml-оо шалгана уу.
      </div>
    );
  }

  const db = drizzle(env.DB);
  const allTodos = await db.select().from(todos).all();

  return (
    <main className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md text-black">
      <h1 className="text-2xl font-bold mb-6">Хийх ажлын жагсаалт</h1>

      {/* Нэмэх хэсэг */}
      <form action={addTodo} className="flex gap-2 mb-6">
        <input
          name="task"
          required
          placeholder="Шинэ ажил..."
          className="flex-1 border border-gray-300 p-2 rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Нэмэх
        </button>
      </form>

      {/* Жагсаалт */}
      <ul className="space-y-3">
        {allTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>{todo.task}</span>
            <form action={deleteTodo.bind(null, todo.id)}>
              <button className="text-red-500 hover:text-red-700 text-sm">
                Устгах
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
