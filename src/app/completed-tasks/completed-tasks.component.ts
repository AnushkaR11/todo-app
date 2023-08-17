import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css'],
})
export class CompletedTasksComponent {
  // Input property 'todoObj' keeps track of the completed tasks object.
  @Input() todoObj: Todo = { title: '', completed: false };

  // Output property 'deletedTodoTask' which is an event emitter notifies parent component when the specific task is to be deleted.
  @Output() deleteTodoTask = new EventEmitter<void>();
}
