import {
  ColumnType,
  GeneratedAlways, 
  Insertable,
  Selectable,
  Updateable,
} from "kysely";
export type Numeric = ColumnType<string, string | number, string | number>;


export interface Account {
  id: GeneratedAlways<string>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

export interface Session {
  id: GeneratedAlways<string>;
  userId: string;
  sessionToken: string;
  expires: Date;
}

export interface User {
  id: GeneratedAlways<string>;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}
export interface RequestRescue {
  latitude: Numeric;
  longitude: Numeric;
  userId: string;
}

export interface Database {
  Account: Account;
  Session: Session;
  RequestRescue: RequestRescue;
  User: User;
  VerificationToken: VerificationToken;
}
