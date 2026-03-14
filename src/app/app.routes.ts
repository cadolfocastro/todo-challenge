import { Login } from './features/auth/pages/login/login';
import { Routes } from '@angular/router';
import { TaskList } from './features/tasks/pages/task-list/task-list';
import { authGuard, noAuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [noAuthGuard],

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
