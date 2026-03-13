import { Login } from './features/auth/pages/login/login';
import { Routes } from '@angular/router';
import { TaskList } from './features/tasks/pages/task-list/task-list';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'task',
    component: TaskList,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
