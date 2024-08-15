import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {

    constructor(private prisma: PrismaService) {}

    async createTodo(userId: string, title: string , content: string){
        return this.prisma.todo.create({
            data:{
                title,
                content,
                userId
            },
        });
    }

    async getTodos(userId: string){
        return this.prisma.todo.findMany({
            where: {
               
                userId
            }
        });
    }

    async updateTodo(
        userId: string, 
        todoId: string, 
        title: string, 
        content: string){

        if(!todoId){
            throw new Error('Todo id is required');
        }
        console.log("todoId:",todoId)

        const todo = await this.prisma.todo.findUnique({
            where: {
                id: todoId,
            },
        });
        if(!todo){
            throw new Error('Todo not found');
        }

        if (todo.userId !== userId) {
            throw new ForbiddenException('You are not allowed to update this todo');
        }

        //update
        return this.prisma.todo.update({
            where:{
                id: todoId
            },
            data:{
                title: title,
                content: content,
            }
        });
      
    }

    async deleteTodo(userId: string, todoId: string){

        if(!todoId){
            throw new Error('Todo id is required');
        }

        //check the todo exists
        const todo = await this.prisma.todo.findUnique({
            where:{
                id:todoId
            }
        });
        if(!todo){
            throw new Error('Todo not found');
        }

        if (todo.userId !== userId) {
            throw new ForbiddenException('You are not allowed to delete this todo');
        }

        return this.prisma.todo.delete({
            where: {
                id: todoId
            }   
        });
    }
}
