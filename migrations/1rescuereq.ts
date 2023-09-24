import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable("RequestRescue")
    .addColumn("latitude", "numeric", (col) => col.notNull())
    .addColumn("longitude", "numeric", (col) => col.notNull())
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("RequestRescue").ifExists().execute();
}
