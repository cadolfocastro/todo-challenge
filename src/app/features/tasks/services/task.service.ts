import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../models/task';
import { environment } from '../../../../environments/environment';

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority?: Task['priority'];
  status?: Task['status'];
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  todo = signal<Task[]>([]);
  inProgress = signal<Task[]>([]);
  done = signal<Task[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  readonly todoTitle = 'To Do';
  readonly inProgressTitle = 'In Progress';
  readonly doneTitle = 'Done';

  loadTasks(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: tasks => {
        this.todo.set(tasks.filter(t => t.status === 'todo'));
        this.inProgress.set(tasks.filter(t => t.status === 'inProgress'));
        this.done.set(tasks.filter(t => t.status === 'done'));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar tareas');
        this.loading.set(false);
      },
    });
  }

  createTask(dto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, dto).pipe(
      tap(task => {
        const status = task.status ?? 'todo';
        if (status === 'inProgress') this.inProgress.update(list => [task, ...list]);
        else if (status === 'done') this.done.update(list => [task, ...list]);
        else this.todo.update(list => [task, ...list]);
      }),
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      tap(updated => this.replaceInSignals(updated)),
    );
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`).pipe(
      tap(() => this.removeFromSignals(taskId)),
    );
  }

  updateTaskStatus(taskId: string, status: Task['status']): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${taskId}`, { status }).pipe(
      tap(updated => this.replaceInSignals(updated)),
    );
  }

  private replaceInSignals(updated: Task): void {
    const replace = (list: Task[]) => list.map(t => (t.id === updated.id ? updated : t));
    this.todo.update(replace);
    this.inProgress.update(replace);
    this.done.update(replace);
  }

  private removeFromSignals(id: string): void {
    const filter = (list: Task[]) => list.filter(t => t.id !== id);
    this.todo.update(filter);
    this.inProgress.update(filter);
    this.done.update(filter);
  }
}
