import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { User } from './domain/entity/user.entity';
import { UserRepository } from './user.respository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
        private readonly em: EntityManager,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { name, email, password } = createUserDto;

        const exists = await this.userRepository.count({ email });

        if (exists > 0) {
            throw new HttpException({
                message: 'Input data validation failed',
                errors: { username: 'Email must be unique.' },
            }, HttpStatus.BAD_REQUEST);
        }

        // create new user
        const user = new User(name, email, password);
        const errors = await validate(user);

        console.log("errors: ", errors)
        if (errors.length > 0) {
            throw new HttpException({
                message: 'Input data validation failed',
                errors: { username: 'Userinput is not valid.' },
            }, HttpStatus.BAD_REQUEST);
        } else {
            await this.em.persistAndFlush(user);
            return user;
        }
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ email });
    }

    // async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    //     const user = await this.userRepository.findOne({ id });
    //     if (!user) {
    //         return null;
    //     }

    //     if (updateUserDto.name) user.name = updateUserDto.name;
    //     if (updateUserDto.email) user.email = updateUserDto.email;
    //     if (updateUserDto.password) user.password = updateUserDto.password;

    //     await this.userRepository.persistAndFlush(user);
    //     return user;
    // }

    // async delete(id: number): Promise<boolean> {
    //     const user = await this.userRepository.findOne({ id });
    //     if (!user) {
    //         return false;
    //     }

    //     await this.userRepository.removeAndFlush(user);
    //     return true;
    // }
}
export { UpdateUserDto, CreateUserDto };

