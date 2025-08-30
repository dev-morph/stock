import { EntityRepository } from "@mikro-orm/core";
import { User } from "./domain/entity/user.entity";

export class UserRepository extends EntityRepository<User> {
}