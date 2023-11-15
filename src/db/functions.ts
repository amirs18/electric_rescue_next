import { db } from "./database";


export const getAllRequestsWithUserData = async (offset:number,limit: number)=>await db.selectFrom("RequestRescue").innerJoin('User','User.id','RequestRescue.userId').selectAll().offset(offset).limit(limit).execute()