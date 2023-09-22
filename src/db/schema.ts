import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";
import { type } from "os";


export type Numeric = ColumnType<string, string | number, string | number>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Users {
  id: Generated<number>;
  name: string;
  email: string;
  phone: Numeric | null;
  created_at: Generated<Timestamp>;
}

export type User = Selectable<Users>
export type NewUser = Insertable<Users>
export type UpdateUser = Updateable<Users>

export interface DB {
  users: Users;
}
