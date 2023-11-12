import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db
    .withSchema("electric_rescue")
    .schema.createType("role")
    .asEnum(["admin", "superuser", "regular", "operator"])
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {

  await db
    .withSchema("electric_rescue")
    .schema.dropType("role")
    .ifExists()
    .execute();
}
