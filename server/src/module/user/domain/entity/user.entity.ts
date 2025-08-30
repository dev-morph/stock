import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { IsEmail, IsString } from "class-validator";
import * as crypto from 'crypto';

@Entity({ tableName: 'users' })
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    @IsString()
    name!: string;

    @Property({ unique: true })
    @IsEmail()
    email!: string;

    @Property({ hidden: true })
    @IsString()
    password!: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(name: string, email: string, password: string) {
        console.log("name: ", name, " email ", email, " password: ", password)
        this.name = name;
        this.email = email;
        this.password = crypto.createHmac('sha256', password).digest('hex');
    }
}