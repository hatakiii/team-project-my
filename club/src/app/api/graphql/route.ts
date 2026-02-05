import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

// 1. Schema тодорхойлох
const typeDefs = `#graphql
  type Todo {
    id: Int
    task: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    addTodo(task: String!): Todo
    deleteTodo(id: Int!): Boolean
  }
`;

// 2. Resolvers тодорхойлох
export const resolvers = {
  Query: {
    getTodos: async (_: any, __: any, { db }: { db: any }) => {
      return await db.select().from(todos).all();
    },
  },
  Mutation: {
    addTodo: async (
      _: any,
      { task }: { task: string },
      { db }: { db: any },
    ) => {
      const result = await db.insert(todos).values({ task }).returning();
      return result[0];
    },
    deleteTodo: async (_: any, { id }: { id: number }, { db }: { db: any }) => {
      await db.delete(todos).where(eq(todos.id, id)).run();
      return true;
    },
  },
};

// 3. Server үүсгэх
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Edge Runtime ашиглахыг зааж өгөх (Чухал!)
export const runtime = "edge";

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    // Cloudflare-ийн DB-г context-оор дамжуулна
    const { env } = getRequestContext();
    const db = drizzle(env.DB);
    return { db };
  },
});

export { handler as GET, handler as POST };
