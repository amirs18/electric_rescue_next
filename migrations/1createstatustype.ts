import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.withSchema("electric_rescue").schema
    .createType("status")
    .asEnum(["pending", "recived", "on route", "done", "can`t be done"])
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {
  await db.withSchema("electric_rescue").schema.dropType("status").ifExists().execute();
}
