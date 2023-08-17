import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../models/todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CompletedTasksComponent } from '../completed-tasks/completed-tasks.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService: any;
  let mockToastrService: any;
  let todoMockData : Todo[] = [];

  beforeEach(() => {
    todoMockData = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ];

    mockTodoService = jasmine.createSpyObj(['getTodos', 'addTodo', 'updateTodo', 'deleteTodo']);
    mockToastrService = jasmine.createSpyObj(['success', 'error']);

    TestBed.configureTestingModule({
      declarations: [ TodoListComponent, TodoItemComponent, CompletedTasksComponent ],
      providers: [
        { provide: TodoService, useValue: mockTodoService },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    mockTodoService.getTodos.and.returnValue(of(todoMockData));
    fixture.detectChanges();

    expect(component.todoTasks.length).toBe(2);
  });

  it('should add new task and refresh the list', () => {
    const newTodo = { title: 'Task 3', completed: false };
    mockTodoService.getTodos.and.returnValue(of([...todoMockData, newTodo]));
    mockTodoService.addTodo.and.returnValue(of(newTodo));
    fixture.detectChanges();

    component.addTodo(newTodo.title);
    expect(mockTodoService.addTodo).toHaveBeenCalledWith(newTodo);
    expect(mockToastrService.success).toHaveBeenCalled();
    expect(component.todoTasks.length).toBe(3);
  });

  it('should update task to complete and refresh the list', () => {
    const updatedTodoIndex = 1;
    todoMockData[updatedTodoIndex].completed = true;
    mockTodoService.updateTodo.and.returnValue(of(todoMockData[updatedTodoIndex]));
    mockTodoService.getTodos.and.returnValue(of(todoMockData));
    fixture.detectChanges();

    component.markAsComplete(updatedTodoIndex);
    expect(mockTodoService.updateTodo).toHaveBeenCalled();
    expect(mockToastrService.success).toHaveBeenCalled();
    expect(component.todoTasks[updatedTodoIndex].completed).toBe(true);
  });

  it('should update task title and refresh the list', () => {
    const updatedTodoIndex = 0;
    const newTitle = 'Updated title';

    todoMockData[updatedTodoIndex].title = newTitle;

    mockTodoService.updateTodo.and.returnValue(of(todoMockData[updatedTodoIndex]));
    mockTodoService.getTodos.and.returnValue(of(todoMockData));
    fixture.detectChanges();

    component.ngOnInit();
    component.editTodoTitle(updatedTodoIndex, newTitle);

    expect(mockTodoService.updateTodo).toHaveBeenCalled();
    expect(component.todoTasks[updatedTodoIndex].title).toEqual(newTitle);
  });


    it('should delete a task and refresh the list', () => {
      const index = 0;
      mockTodoService.deleteTodo.and.returnValue(of(null));
      mockTodoService.getTodos.and.returnValue(of([todoMockData[1]]));

      component.todoTasks = [...todoMockData];
      component.deleteTodo(index);

      expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(todoMockData[index].id);
      expect(mockToastrService.error).toHaveBeenCalled();
      expect(component.todoTasks.length).toBe(1);
    });

  });
