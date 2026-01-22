import { Injectable } from '@angular/core';
import { NewTask, Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [
    { id: 1, titulo: 'Instalar Angular', descripcion: 'CLI + Node', completada: false },
    { id: 2, titulo: 'Crear primera página', completada: true },
  ];
  private nextId = 3;

  list(): Task[] {
    return this.tasks;
  }

  add(data: NewTask): Task {
    const created: Task = { id: this.nextId++, ...data };
    this.tasks = [created, ...this.tasks];
    return created;
  }

  remove(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
