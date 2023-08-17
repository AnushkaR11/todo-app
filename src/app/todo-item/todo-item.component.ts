import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  // Input property 'todoObj' contains the information of todo items.
  @Input() todoObj: Todo = { title: '', completed: false };

  // Output properties or event emitters to communicate with parent component.
  @Output() markAsComplete = new EventEmitter<void>();
  @Output() editTodoTitle = new EventEmitter<string>();
  @Output() deleteTodoTask = new EventEmitter<void>();

  // Flag to indicate that the task is to be edited or not.
  toEdit = false;

  // Keeps the edited title.
  editedTitle = '';

  // Method for edit action.
  onEdit(newText: string): void {
    this.editTodoTitle.emit(newText);
  }

  // Saves the edited title
  saveEdit(): void {
    if (this.editedTitle) {
      this.editTodoTitle.emit(this.editedTitle);
      this.toEdit = false;
      this.editedTitle = '';
    }
  }

  // Cancels editing
  cancelEdit(): void {
    this.toEdit = false;
    this.editedTitle = '';
  }
}
