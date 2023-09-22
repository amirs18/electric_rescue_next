import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server";


export const serverClient = appRouter.createCaller({session:{user:{name:'ADMIN',id:'841995'},expires:'NEVER'}});
