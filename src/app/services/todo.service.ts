import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
// This service is responsible for handling all the CRUD operations for the application using HTTP requests.

// API URL where the data from db.json is stored.
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  // Receives a list of 'Todo' objects from the server and returns an Observable that emits the results of all the Todo objects.
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // Adds a new Todo object to the server and accepts a Todo object as parameter and returns an Observable that emits the new Todo object.
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  // Updates an existing Todo with the given id and an object with partial updates and returns an Observable that gives success or failure of operation.
  updateTodo(id: number, updates: Partial<Todo>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, updates);
  }

  // Deletes a Todo from the list of Todo objects and returns an Observable that gives success or failure of operation.
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
