import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('todo')

export class TodoController {
    
    constructor(private todoService: TodoService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createTodo(@Req() req, @Body() body: { title: string; content: string }) {
        return this.todoService.createTodo(req.user.userId, body.title, body.content);
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getTodos(@Req() req) {
        return this.todoService.getTodos(req.user.userId);
    } 
    
    @UseGuards(JwtAuthGuard)
    @Patch(':todoId')
    async updateTodo(
        @Req() req, 
        @Param('todoId') todoId: string, 
        @Body() body: {title: string; content: string}
    ){
        return this.todoService.updateTodo(req.user.userId, todoId, body.title, body.content);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':todoId')
    async deleteTodo(@Req() req, @Param('todoId') todoId: string){
        return this.todoService.deleteTodo(req.user.userId, todoId);
    }

}
