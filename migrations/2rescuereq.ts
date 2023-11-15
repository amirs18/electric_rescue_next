import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable("RequestRescue")
    .addColumn("latitude", "numeric", (col) => col.notNull())
    .addColumn("longitude", "numeric", (col) => col.notNull())
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("additionalInfo","varchar")
    .addColumn("status", sql`"electric_rescue".status`)
    .addColumn("timeStamp", "timestamp", (col) => col.notNull().unique())
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("RequestRescue").ifExists().execute();
}
