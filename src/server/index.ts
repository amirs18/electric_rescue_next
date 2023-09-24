import { date, z } from "zod";
import { priveteProcedure, publicProcedure, createTRPCRouter } from "./trpc";
import { db } from "../db/database";
import { User} from "@/db/schema";
import { TRPCError } from "@trpc/server";

// function delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
// }
export const appRouter = createTRPCRouter({
  getMe: publicProcedure.input(z.string()).query(async (opts) => {
    //TODO fix
        const me = await db.selectFrom('User').selectAll().where("email","=",opts.ctx.session?.user?.email!).executeTakeFirst();
    return me;
  }),
  // addTodo: publicProcedure.input(z.custom<NewTodo>()).mutation(async (opts) => {
  //   await db.insertInto("todo").values(opts.input).executeTakeFirstOrThrow();
  //   return true;
  // }),
  // setDone: priveteProcedure
  //   .input(z.custom<TodoUpdate>())
  //   .mutation(async (opts) => {
  //           opts.input.updated_at = new Date();
  //     if (opts.input.id)
  //       try {
  //         await db
  //           .updateTable("todo")
  //           .where("todo.id", "=", opts.input.id)
  //           .set(opts.input)
  //           .execute();
  //         return opts.input;
  //       } catch (error) {
  //         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  //       }
  //   }),
  // delete: publicProcedure
  //   .input(z.custom<TodoUpdate>())
  //   .mutation(async (opts) => {
  //     if (opts.input.id)
  //       await db
  //         .deleteFrom("todo")
  //         .where("todo.id", "=", opts.input.id)
  //         .execute();
  //   }),
});

export type AppRouter = typeof appRouter;
