import { Migration } from '@mikro-orm/migrations';

export class Migration20250830133842_init extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);

    this.addSql(`create table "tokens" ("id" serial primary key, "user_id" int not null, "provider" varchar(255) not null, "access_token" varchar(255) not null, "refresh_token" varchar(255) null, "token_type" varchar(255) null, "scopes" text[] null, "expires_at" timestamptz null, "last_refreshed_at" timestamptz null, "revoked_at" timestamptz null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`alter table "tokens" add constraint "tokens_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

}
