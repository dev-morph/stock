import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpStatus, HttpException } from '@nestjs/common';

import { User } from './domain/entity/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.userService.create(createUserDto);
        } catch (error) {
            console.log("error: ", error);
            if (error.message.includes('duplicate key')) {
                throw new HttpException('Email already exists', HttpStatus.CONFLICT);
            }
            throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    // @Put(':id')
    // async update(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updateUserDto: UpdateUserDto,
    // ): Promise<User> {
    //     const user = await this.userService.update(id, updateUserDto);
    //     if (!user) {
    //         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    //     }
    //     return user;
    // }

    // @Delete(':id')
    // async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    //     const deleted = await this.userService.delete(id);
    //     if (!deleted) {
    //         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    //     }
    //     return { message: 'User deleted successfully' };
    // }
}