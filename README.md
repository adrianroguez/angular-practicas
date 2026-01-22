# Práctica 1: Gestión de Tareas en Angular

Esta práctica consiste en crear una pequeña aplicación para gestionar tareas (To-Do List) utilizando Angular. Aprenderás sobre componentes, servicios, enrutamiento, modelos y formularios reactivos.

## 1. Generación de Componentes y Servicios

Ejecuta los siguientes comandos en tu terminal desde la raíz del proyecto:

```bash
ng g c pages/home
ng g c pages/tasks
ng g c pages/task-new
ng g c shared/navbar
ng g s services/tasks
```

Esto generará la siguiente estructura de carpetas:

```text
src/app/
├─ pages/
│  ├─ home/
│  ├─ tasks/
│  └─ task-new/
├─ shared/
│  └─ navbar/
└─ services/
   └─ tasks.service.ts
```

## 2. Creación del Modelo (`Task`)

Crea el archivo `src/app/models/task.model.ts` con el siguiente contenido:

```typescript
export interface Task {
  id: number;
  titulo: string;
  descripcion?: string;
  completada: boolean;
}

export type NewTask = Omit<Task, 'id'>;
```

> **Nota:** Usamos `NewTask` para tareas nuevas (sin ID) y `Task` para tareas ya existentes (con ID). Esto ayuda a evitar errores de tipado.

## 3. Configuración de Rutas

Edita `src/app/app.routes.ts` para definir la navegación:

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskNewComponent } from './pages/task-new/task-new.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tareas', component: TasksComponent },
  { path: 'tareas/nueva', component: TaskNewComponent },
  { path: '**', redirectTo: '' },
];
```

## 4. Estructura Principal (`AppComponent`)

### `src/app/app.component.html`
Definimos el layout principal con la barra de navegación y el `router-outlet`.

```html
<app-navbar></app-navbar>

<main class="container">
  <router-outlet></router-outlet>
</main>
```

### `src/app/app.component.ts`
Importamos `RouterOutlet` y `NavbarComponent`.

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
```

## 5. Componente de Navegación (`NavbarComponent`)

### `src/app/shared/navbar/navbar.component.ts`
```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
```

### `src/app/shared/navbar/navbar.component.html`
```html
<nav class="nav">
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
  <a routerLink="/tareas" routerLinkActive="active">Tareas</a>
  <a routerLink="/tareas/nueva" routerLinkActive="active">Nueva tarea</a>
</nav>
```

### `src/app/shared/navbar/navbar.component.css`
```css
.nav { display: flex; gap: 12px; padding: 12px 16px; background: white; border-bottom: 1px solid #eee; }
.nav a { text-decoration: none; color: #333; padding: 8px 10px; border-radius: 10px; }
.nav a.active { background: #ffe6e6; color: #b71c1c; font-weight: 600; }
```

## 6. Estilos Globales

Añade estos estilos en `src/styles.css` para que la aplicación se vea bien:

```css
body { margin: 0; font-family: system-ui, sans-serif; background: #f6f7fb; }
.container { max-width: 900px; margin: 0 auto; padding: 16px; }
.card { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 12px rgba(0,0,0,.06); }
.row { display: flex; gap: 12px; flex-wrap: wrap; }
.btn { border: 0; padding: 10px 12px; border-radius: 10px; cursor: pointer; }
.btn-primary { background: #d32f2f; color: white; }
.btn-ghost { background: transparent; border: 1px solid #ddd; }
.input { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid #ddd; }
.error { color: #b71c1c; font-size: 0.9rem; margin-top: 6px; }
```

## 7. Servicio de Tareas (`TasksService`)

Creamos un servicio para manejar los datos (en memoria). Edita `src/app/services/tasks.service.ts`:

```typescript
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
```

## 8. Página de Inicio (`HomeComponent`)

### `src/app/pages/home/home.component.html`
```html
<section class="card">
  <h2>Bienvenido/a</h2>
  <p>Esta app es un ejercicio de Angular moderno: páginas, estilos y formularios.</p>
</section>
```

## 9. Listado de Tareas (`TasksComponent`)

### `src/app/pages/tasks/tasks.component.ts`
```typescript
import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  constructor(public tasksService: TasksService) {}

  remove(id: number) {
    this.tasksService.remove(id);
  }
}
```

### `src/app/pages/tasks/tasks.component.html`
```html
<section class="card">
  <h2>Lista de tareas</h2>

  @if (tasksService.list().length === 0) {
    <p>No hay tareas todavía.</p>
  } @else {
    <ul class="list">
      @for (t of tasksService.list(); track t.id) {
        <li class="item">
          <div>
            <strong>{{ t.titulo }}</strong>
            @if (t.descripcion) { <div class="muted">{{ t.descripcion }}</div> }
          </div>

          <button class="btn btn-ghost" (click)="remove(t.id)">Eliminar</button>
        </li>
      }
    </ul>
  }
</section>
```

### `src/app/pages/tasks/tasks.component.css`
```css
.list { list-style: none; padding: 0; margin: 12px 0 0; }
.item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-top: 1px solid #eee; }
.muted { color: #666; font-size: .95rem; margin-top: 4px; }
```

## 10. Crear Tarea (`TaskNewComponent`)

### `src/app/pages/task-new/task-new.component.ts`
**Importante:** Recuerda importar `ReactiveFormsModule`.

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-new.component.html',
  styleUrl: './task-new.component.css',
})
export class TaskNewComponent {
  private fb = inject(FormBuilder);
  private tasks = inject(TasksService);
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
    this.tasks.add(this.form.getRawValue());
    this.router.navigateByUrl('/tareas');
  }

  cancel() {
    this.router.navigateByUrl('/tareas');
  }
}
```

### `src/app/pages/task-new/task-new.component.html`
```html
<section class="card">
  <h2>Nueva tarea</h2>

  <form [formGroup]="form" (ngSubmit)="save()">
    <label>
      Título
      <input class="input" formControlName="titulo" />
    </label>

    @if (form.controls.titulo.touched && form.controls.titulo.invalid) {
      <div class="error">
        El título es obligatorio y debe tener al menos 3 caracteres.
      </div>
    }

    <label>
      Descripción (opcional)
      <input class="input" formControlName="descripcion" />
    </label>

    <label class="check">
      <input type="checkbox" formControlName="completada" />
      Completada
    </label>

    <div class="row">
      <button class="btn btn-primary" type="submit">Guardar</button>
      <button class="btn btn-ghost" type="button" (click)="cancel()">Cancelar</button>
    </div>
  </form>
</section>
```

### `src/app/pages/task-new/task-new.component.css`
```css
form { display: grid; gap: 12px; margin-top: 12px; }
label { display: grid; gap: 6px; }
.check { display: flex; align-items: center; gap: 8px; }
```

---

## 🚀 Ejercicios para entregar

Ahora te toca a ti mejorar la aplicación:

1.  **Cambia el tema de colores:** Modifica el fondo, el navbar y los colores de los botones para darle tu toque personal.
2.  **Validación extra:** Añade una validación en el formulario para que, si el usuario escribe una descripción, esta tenga **al menos 5 caracteres**.
3.  **Botón "Marcar completada":** En el listado de tareas (`TasksComponent`), añade un botón (o checkbox) para marcar una tarea como completada o pendiente visualmente.
4.  **Página "Acerca de":** Crea una nueva página (`AboutComponent`) y añádela al router y al navbar.

¡Suerte!
