import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "src/module/user/domain/entity/user.entity";

@Entity({ tableName: 'tokens' })
export class Token {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @Property()
    provider!: string;

    @Property()
    accessToken!: string;    // 암호화된 문자열

    @Property({ nullable: true })
    refreshToken?: string;

    @Property({ nullable: true })
    tokenType?: string;

    @Property({ type: 'text[]', nullable: true })
    scopes?: string[];

    @Property({ type: 'timestamptz', nullable: true })
    expiresAt?: Date;

    @Property({ type: 'timestamptz', nullable: true })
    lastRefreshedAt?: Date;

    @Property({ type: 'timestamptz', nullable: true })
    revokedAt?: Date;

    @Property({ type: 'timestamptz', onCreate: () => new Date() })
    createdAt!: Date;

    @Property({ type: 'timestamptz', onUpdate: () => new Date() })
    updatedAt!: Date;
}