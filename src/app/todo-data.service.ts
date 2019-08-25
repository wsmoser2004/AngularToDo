// This file was added in Step 5
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';

@Injectable() // Injectable needed here because we are injecting into this service
export class TodoDataService {
  private rootURL: string = 'http://localhost:3000';

  constructor(private aHttpService: HttpClient) {}

  // Read/Get All todos
  getAllTodos(): Observable<Array<Todo>> {
    return this.aHttpService.get<Array<Todo>>(`${this.rootURL}/todos`);
  }

  // Added for Step 7
  // Get all completed tasks
  completedTodos(): Observable<Array<Todo>> {
    return this.aHttpService.get<Array<Todo>>(
      `${this.rootURL}/todos?complete=true`
    );
  }

  // Added for Step 7
  // Get all incomplete tasks
  incompletedTodos(): Observable<Array<Todo>> {
    return this.aHttpService.get<Array<Todo>>(
      `${this.rootURL}/todos?complete=false`
    );
  }

  // Added for Stop 8
  // Create/Post todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.aHttpService.post<Todo>(`${this.rootURL}//todos`, todo);
  }

  // Added for Step 9
  // Complete function
  toggleTodoComplete(todo: Todo): Observable<Todo> {
    todo.complete = !todo.complete;
    return this.updateTodoById(todo.id, todo);
  }

  // Added for Step 9
  // Update/Put todo
  updateTodoById(id: number, newTodo: Todo): Observable<Todo> {
    return this.aHttpService.put<Todo>(`${this.rootURL}/todos/${id}`, newTodo);
  }

  // Added for Step 11
  // Delete todo
  deleteTodoById(id: number): Observable<Todo> {
    return this.aHttpService.delete<Todo>(`${this.rootURL}/todos/${id}`);
  }
}
