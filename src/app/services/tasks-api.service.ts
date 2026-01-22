import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { NewTask, Task } from '../models/task.model';
import { ApiTask, fromApiTask, toApiNewTask } from './task-mapper';

@Injectable({ providedIn: 'root' })
export class TasksApiService {
    private baseUrl = `${environment.apiBaseUrl}/tasks`;

    constructor(private http: HttpClient) { }

    list(): Observable<Task[]> {
        return this.http.get<ApiTask[]>(this.baseUrl).pipe(
            map(arr => arr.map(fromApiTask)),
            catchError(() => throwError(() => new Error('No se pudo conectar con la API de tareas.')))
        );
    }

    getById(id: number): Observable<Task> {
        return this.http.get<ApiTask>(`${this.baseUrl}/${id}`).pipe(
            map(fromApiTask),
            catchError(() => throwError(() => new Error('No se pudo obtener la tarea.')))
        );
    }

    create(data: NewTask): Observable<Task> {
        return this.http.post<ApiTask>(this.baseUrl, toApiNewTask(data)).pipe(
            map(fromApiTask),
            catchError(() => throwError(() => new Error('No se pudo crear la tarea.')))
        );
    }

    update(id: number, data: NewTask): Observable<Task> {
        return this.http.put<ApiTask>(`${this.baseUrl}/${id}`, toApiNewTask(data)).pipe(
            map(fromApiTask),
            catchError(() => throwError(() => new Error('No se pudo actualizar la tarea.')))
        );
    }

    remove(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
            catchError(() => throwError(() => new Error('No se pudo eliminar la tarea.')))
        );
    }
}
