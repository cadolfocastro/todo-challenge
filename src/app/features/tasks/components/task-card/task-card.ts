import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TaskModal } from '../task-modal/task-modal';
import { ConfirmModal } from '../confirm-modal/confirm-modal';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  task = input<Task | undefined>();

  delete = output<Task>();
  update = output<Task>();

  constructor(private dialog: MatDialog) {}

  deleteTask() {
    const task = this.task();
    if (task) {
      const dialogRef = this.dialog.open(ConfirmModal, {
        width: '400px',
        data: { message: `¿Estás seguro de que quieres eliminar la tarea "${task.title}"?` }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.delete.emit(task);
        }
      });
    }
  }

  openEditModal() {
    const dialogRef = this.dialog.open(TaskModal, {
      width: '400px',
      data: { isEdit: true, task: this.task() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update.emit(result);
      }
    });
  }
}
