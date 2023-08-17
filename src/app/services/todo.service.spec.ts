import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve todos from API via GET', () => {
    const dummyTodos: Todo[] = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true }
    ];

    service.getTodos().subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(dummyTodos);
    });

    const request = httpMock.expectOne(`${service.apiUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyTodos);
  });

  it('should add a todo item via POST', () => {
    const newTodo: Todo = { id: 3, title: 'Todo 3', completed: false };

    service.addTodo(newTodo).subscribe(todo => {
      expect(todo).toEqual(newTodo);
    });

    const request = httpMock.expectOne(`${service.apiUrl}`);
    expect(request.request.method).toBe('POST');
    request.flush(newTodo);
  });

  it('should update a todo item via PATCH', () => {
    const updates: Partial<Todo> = { title: 'Updated Todo', completed: true };

    service.updateTodo(3, updates).subscribe(update => {
      expect(update).toEqual(updates);
    });

    const request = httpMock.expectOne(`${service.apiUrl}/3`);
    expect(request.request.method).toBe('PATCH');
    request.flush(updates);
  });

  it('should delete a todo item via DELETE', () => {
    service.deleteTodo(3).subscribe(response => {
      expect(response).toEqual(null);
    });

    const request = httpMock.expectOne(`${service.apiUrl}/3`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });

});
