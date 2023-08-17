import { Component } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todoTasks: Todo[] = [];

  constructor(private todoService: TodoService, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Gets the list of tasks from the service on component initialization.
    this.todoService.getTodos().subscribe(todos => {
      this.todoTasks = todos;
    });
  }

  // Adds a new task to the list.
  addTodo(title: string): void {
    const newTodo: Todo = { title, completed: false };
    this.todoService.addTodo(newTodo).subscribe(() => {
      this.toastr.success('Task added to the list', 'Task added successfully');
      this.refreshTodos();
    });
  }

  // Refreshs the list.
  refreshTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todoTasks = todos;
    });
  }

  // Marks a task as completed.
  markAsComplete(index: number): void {
    this.todoService.updateTodo(this.todoTasks[index].id!, { completed: true }).subscribe(() => {
      this.toastr.success(`${this.todoTasks[index].title} is masked as completed`, 'Task completed successfully');
      this.todoTasks[index].completed = true;
    });
  }

  // Edits the title from the current task.
  editTodoTitle(index: number, newTitle: any): void {
    this.todoService.updateTodo(this.todoTasks[index].id!, { title: newTitle }).subscribe(() => {
      this.todoTasks[index].title = newTitle;
    });
  }

  // Deletes a task from the list.
  deleteTodo(index: number): void {
    this.todoService.deleteTodo(this.todoTasks[index].id!).subscribe(() => {
      this.toastr.error(`${this.todoTasks[index].title} has been deleted`, 'Task deleted');
      this.todoTasks.splice(index, 1);
    });
  }
}
