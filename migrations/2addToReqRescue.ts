import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType("status")
    .asEnum(["pending", "recived", "on route", "done", "can`t be done"])
    .execute();
  db.schema
    .alterTable("RequestRescue")
    .addColumn("additionalInfo","varchar")
    .addColumn("status", sql`status`)
    .addColumn("timeStamp", "date", (col) => col.notNull().unique())
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("RequestRescue").ifExists().execute();
}
