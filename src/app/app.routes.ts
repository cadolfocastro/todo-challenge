import { Login } from './features/auth/pages/login/login';
import { Routes } from '@angular/router';
import { TaskList } from './features/tasks/pages/task-list/task-list';

export const routes: Routes = [
  {
    path: 'login', component: Login
  },
  {
    path:'task', component: TaskList
  },
  {
    path: '**', redirectTo: 'login'

  }
];
