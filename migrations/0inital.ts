import { Kysely, sql } from "kysely";
import { Database } from "@/db/schema";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createSchema('electric_rescue').execute()
  await db.withSchema("electric_rescue").schema
    .createTable("User")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("emailVerified", "timestamptz")
    .addColumn("image", "text")
    .execute();

  await db.withSchema("electric_rescue").schema
    .createTable("Account")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("provider", "text", (col) => col.notNull())
    .addColumn("providerAccountId", "text", (col) => col.notNull())
    .addColumn("refresh_token", "text")
    .addColumn("access_token", "text")
    .addColumn("expires_at", "bigint")
    .addColumn("token_type", "text")
    .addColumn("scope", "text")
    .addColumn("id_token", "text")
    .addColumn("session_state", "text")
    .execute();

  await db.withSchema("electric_rescue").schema
    .createTable("Session")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("sessionToken", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .execute();

  await db.withSchema("electric_rescue").schema
    .createTable("VerificationToken")
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .execute();

  await db.withSchema("electric_rescue").schema
    .createIndex("Account_userId_index")
    .on("Account")
    .column("userId")
    .execute();

  await db.withSchema("electric_rescue").schema
    .createIndex("Session_userId_index")
    .on("Session")
    .column("userId")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.withSchema("electric_rescue").schema.dropTable("Account").ifExists().execute();
  await db.withSchema("electric_rescue").schema.dropTable("Session").ifExists().execute();
  await db.withSchema("electric_rescue").schema.dropTable("User").ifExists().execute();
  await db.withSchema("electric_rescue").schema.dropTable("VerificationToken").ifExists().execute();
  await db.schema.dropSchema('electric_rescue').ifExists().execute()
}