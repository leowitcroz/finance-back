import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthGuard } from '../../guard/auth.Guard';

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
    async createUser(@Body() { email, password }: CreateUserDto) {
        return this.user.createUser({ email, password })
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id, @Body() { email, password }) {
        return this.user.updateUser(id, { email, password })
    }
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id) {
        return this.user.delete(id)
    }


}
