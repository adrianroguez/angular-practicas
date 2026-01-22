import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  constructor(public tasksService: TasksService) { }

  remove(id: number) {
    this.tasksService.remove(id);
  }
}
