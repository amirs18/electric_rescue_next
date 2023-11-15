import { date, string, z } from "zod";
import { priveteProcedure, publicProcedure, createTRPCRouter } from "./trpc";
import { db } from "../db/database";
import { NewRequestRescue } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { getUserIDFromEamil } from "./utils/userUtils";
import Email from "next-auth/providers/email";
import { getServerAuthSession } from "./auth";
import { use } from "react";
import { getAllRequestsWithUserData } from "@/db/functions";

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
export const appRouter = createTRPCRouter({
  getMe: publicProcedure.query(async (opts) => {
    //TODO fix
    const me = await db
      .selectFrom("User")
      .selectAll()
      .where("email", "=", opts.ctx.session?.user?.email!)
      .executeTakeFirst();
    return me;
  }),
  makeMeAdmin: priveteProcedure.mutation(async (opts) => {
    const usersession = await getServerAuthSession();
    if (opts.ctx.session?.user?.email) {
      const user = await getUserIDFromEamil(opts.ctx.session.user.email);
      await db
        .insertInto("UserRole")
        .values({ userId: user.id, role: "admin" })
        .onConflict((oc) => oc.column("userId").doUpdateSet({ role: "admin" }))

        .execute();
    }
    if (usersession !== null) {
      const user = await getUserIDFromEamil(usersession.user?.email!);
      await db
        .insertInto("UserRole")
        .values({ userId: user.id, role: "admin" })
        .onConflict((oc) => oc.column("userId").doUpdateSet({ role: "admin" }))
        .execute();
    }
  }),
  addRescue: priveteProcedure
    .input(z.custom<NewRequestRescue>())
    .mutation(async (opts) => {
      await db
        .insertInto("RequestRescue")
        .values(opts.input)
        .executeTakeFirstOrThrow();
      return true;
    }),
    getAllRescues: priveteProcedure.input(z.object({
      limit:z.number(),
      offset:z.number()
    }))
    .query(async (opts) =>  getAllRequestsWithUserData(opts.input.offset,opts.input.limit)
    ),
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
