import { Routes } from '@angular/router';
import { TaskCreate } from './task-create/task-create';
import { TaskList } from './task-list/task-list';
import { TaskEdit } from './task-edit/task-edit';

export const routes: Routes = [
  { path: 'tasks', component: TaskList },
  { path: 'tasks/create', component: TaskCreate },
  { path: 'tasks/edit/:id', component: TaskEdit },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];
