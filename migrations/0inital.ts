import { Kysely ,sql} from 'kysely'
import {db} from '../src/db/database'

export async function up(db: Kysely<any>): Promise<void> {
        await db.schema
        .createTable('users')
        .addColumn('id','serial',(col)=>col.primaryKey().unique())
        .addColumn('name','varchar',(col)=>col.notNull())
        .addColumn('email','varchar',(col)=>col.notNull())
        .addColumn('phone','numeric',(col)=> col.unique())
        .addColumn('created_at','timestamp',(col)=>col.defaultTo(sql`now()`).notNull())
        .execute()
}
export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}