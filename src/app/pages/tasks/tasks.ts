import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksApiService } from '../../services/tasks-api.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  errorMsg: string | null = null;
  loading = false;

  constructor(public api: TasksApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = null;

    this.api.list().subscribe({
      next: data => {
        this.tasks = data;
        this.loading = false;
      },
      error: (e: Error) => {
        this.tasks = [];
        this.errorMsg = e.message;
        this.loading = false;
      }
    });
  }

  remove(id: number) {
    this.errorMsg = null;

    this.api.remove(id).subscribe({
      next: () => this.load(),
      error: (e: Error) => this.errorMsg = e.message
    });
  }
}
