import { Component, HostListener, OnInit, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskColumn } from '../../components/task-column/task-column';
import { TaskModal } from '../../components/task-modal/task-modal';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DragDropModule, FormsModule, TaskColumn, MatDialogModule, ScrollingModule, CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  constructor(
    public taskService: TaskService,
    private dialog: MatDialog,
  ) {}

  isDragging = false;

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  onDragStart(): void {
    this.isDragging = true;
  }

  onDragEnd(): void {
    this.isDragging = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    const container = document.querySelector('.board') as HTMLElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const threshold = 50;
    const scrollSpeed = 30;
    if (event.clientX < rect.left + threshold && container.scrollLeft > 0) {
      container.scrollLeft -= scrollSpeed;
    } else if (
      event.clientX > rect.right - threshold &&
      container.scrollLeft < container.scrollWidth - container.clientWidth
    ) {
      container.scrollLeft += scrollSpeed;
    }
  }

  /**
   * Handles CDK drag & drop events.
   * Manually updates the signal arrays and persists the new status to the backend
   * when a task is moved between columns.
   */
  drop(event: CdkDragDrop<Task[]>): void {
    const prevId = event.previousContainer.id;
    const currId = event.container.id;

    if (prevId === currId) {
      const arr = [...this.getSignal(prevId)()];
      moveItemInArray(arr, event.previousIndex, event.currentIndex);
      this.getSignal(currId).set(arr);
    } else {
      const prevArr = [...this.getSignal(prevId)()];
      const currArr = [...this.getSignal(currId)()];
      const [moved] = prevArr.splice(event.previousIndex, 1);
      const newStatus = this.statusFor(currId);
      const updatedTask: Task = { ...moved, status: newStatus };
      currArr.splice(event.currentIndex, 0, updatedTask);
      this.getSignal(prevId).set(prevArr);
      this.getSignal(currId).set(currArr);
      // Persist new status to backend
      this.taskService.updateTaskStatus(moved.id, newStatus).subscribe();
    }
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe();
  }

  updateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask).subscribe();
  }

  openCreateTaskModal(): void {
    const dialogRef = this.dialog.open(TaskModal, {
      width: '420px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService
          .createTask({
            title: result.title,
            description: result.description ?? '',
            priority: result.priority ?? 'Media',
            status: result.status ?? 'todo',
          })
          .subscribe();
      }
    });
  }

  private getSignal(listId: string): WritableSignal<Task[]> {
    if (listId === 'todoList') return this.taskService.todo;
    if (listId === 'inProgressList') return this.taskService.inProgress;
    return this.taskService.done;
  }

  private statusFor(listId: string): Task['status'] {
    if (listId === 'todoList') return 'todo';
    if (listId === 'inProgressList') return 'inProgress';
    return 'done';
  }
}

