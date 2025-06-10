import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from '../models/task/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error) => {
        return throwError(() => new Error(`Error fetching tasks: ${error.message}`));
      })
    );
  }

  findOne(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(`Error fetching task with ID ${id}: ${error.message}`));
      })
    );
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError((error) => {
        return throwError(() => new Error(`Error: ${error.message}`));
      })
    );
  }

  update(id: number, task: Partial<Task>): Observable<Task> {
    const updateUrl = `${this.apiUrl}/${id}`;
    console.log('Sending PATCH request to:', updateUrl); // <<< ADICIONE ESTE LOG
    console.log('Payload for update:', task); // <<< ADICIONE ESTE LOG

    return this.http.patch<Task>(updateUrl, task).pipe(
      catchError(error => {
        console.error(`Erro na requisição PATCH para ${updateUrl}:`, error); // Log mais detalhado
        return throwError(() => new Error(`Error updating task with ID ${id}: ${error.message}`));
      })
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(`Error deleting task with ID ${id}: ${error.message}`));
      })
    );
  }

}
