import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksApiService } from '../../services/tasks-api.service';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-new.html',
  styleUrl: './task-new.css',
})
export class TaskNew {
  private fb = inject(FormBuilder);
  private tasks = inject(TasksApiService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    titulo: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    descripcion: this.fb.nonNullable.control(''),
    completada: this.fb.nonNullable.control(false),
  });

  save() {
    if (this.form.invalid) {
      console.warn('form inválido', this.form.errors, this.form.value);
      this.form.markAllAsTouched();
      return;
    }
    this.tasks.create(this.form.getRawValue()).subscribe(() => {
      this.router.navigateByUrl('/tareas');
    });
  }

  cancel() {
    this.router.navigateByUrl('/tareas');
  }
}
