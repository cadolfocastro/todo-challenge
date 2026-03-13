import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskModal } from '../edit-task-modal/edit-task-modal';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input() task?: Task;
  @Output() delete = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  constructor(private dialog: MatDialog) {}

  deleteTask() {
    if (this.task) this.delete.emit(this.task);
  }
  openEditModal() {
    const dialogRef = this.dialog.open(EditTaskModal, {
      width: '400px',
      data: { ...this.task },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update.emit(result);
      }
    });
  }
}
