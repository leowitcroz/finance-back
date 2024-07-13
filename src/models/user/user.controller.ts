import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly user: UserService) { }

    @Get()
    async findAll() {
        return this.user.findAll()
    }

    @Get(':id')
    async findUnique(@Param('id', ParseIntPipe) id) {
        return this.user.findUnique(id)
    }

    @Post()
    async createUser(@Body() { email, password }) {
        return this.user.createUser({ email, password })
    }

}
