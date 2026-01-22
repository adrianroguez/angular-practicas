import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tasks } from './pages/tasks/tasks';
import { TaskNew } from './pages/task-new/task-new';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: LoginComponent },
    { path: 'tareas', component: Tasks, canActivate: [AuthGuard] },
    { path: 'tareas/nueva', component: TaskNew, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },
];
