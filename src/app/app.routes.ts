import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tasks } from './pages/tasks/tasks';
import { TaskNew } from './pages/task-new/task-new';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'tareas', component: Tasks },
    { path: 'tareas/nueva', component: TaskNew },
    { path: '**', redirectTo: '' },
];
