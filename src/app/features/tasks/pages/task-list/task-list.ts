import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskColumn } from '../../components/task-column/task-column';
import { TaskModal } from '../../components/task-modal/task-modal';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DragDropModule, FormsModule, TaskColumn, MatDialogModule, ScrollingModule],

  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  constructor(
    public taskService: TaskService,
    private dialog: MatDialog,
  ) {}

  isDragging = false;

  onDragStart() {
    this.isDragging = true;
  }

  onDragEnd() {
    this.isDragging = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    const container = document.querySelector('.board') as HTMLElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const threshold = 50;
    const scrollSpeed = 30;
    if (event.clientX < rect.left + threshold && container.scrollLeft > 0) {
      container.scrollLeft -= scrollSpeed;
    } else if (event.clientX > rect.right - threshold && container.scrollLeft < container.scrollWidth - container.clientWidth) {
      container.scrollLeft += scrollSpeed;
    }
  }

  /**
   * Función para manejar el evento de drop en las columnas de tareas. Permite mover tareas dentro de la misma columna o transferirlas entre columnas diferentes utilizando las funciones moveItemInArray y transferArrayItem del CDK de Angular.
   */
  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deleteTask(task: Task, list: Task[]) {
    this.taskService.deleteTask(task, list);
  }

  updateTask(updatedTask: Task) {
    const lists = [this.taskService.todo, this.taskService.inProgress, this.taskService.done];

    lists.forEach((list) => {
      const index = list.findIndex((t) => t.id === updatedTask.id);

      if (index !== -1) {
        list[index] = updatedTask;
      }
    });
  }

  openCreateTaskModal() {
    const dialogRef = this.dialog.open(TaskModal, {
      width: '420px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newTask: Task = {
          id: Date.now(),
          title: result.title,
          description: result.description,
          priority: result.priority,
          createdAt: new Date(),
        };

        if (result.status === 'todo') {
          this.taskService.todo.push(newTask);
        }

        if (result.status === 'inProgress') {
          this.taskService.inProgress.push(newTask);
        }

        if (result.status === 'done') {
          this.taskService.done.push(newTask);
        }
      }
    });
  }
}
