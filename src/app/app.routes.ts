import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login').then(m => m.Login),
    canActivate: [noAuthGuard],

  },
  {
    path: 'task',
    loadComponent: () => import('./features/tasks/pages/task-list/task-list').then(m => m.TaskList),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
