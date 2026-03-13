import { Component, inject, signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../models/task';

interface DialogData {
  isEdit: boolean;
  task?: Task;
}

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css'
})
export class TaskModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TaskModal>);
  public data = inject<DialogData>(MAT_DIALOG_DATA);

  isEdit = signal(this.data.isEdit);
  task = signal(this.data.task);
  form = signal<FormGroup>(this.fb.group({}));

  constructor() {
    effect(() => {
      if (this.isEdit()) {
        this.form.set(this.fb.group({
          title: [this.task()?.title || '', Validators.required],
          description: [this.task()?.description || ''],
          priority: [this.task()?.priority || 'Media']
        }));
      } else {
        this.form.set(this.fb.group({
          title: ['', Validators.required],
          description: [''],
          priority: ['Media'],
          status: ['todo']
        }));
      }
    });
  }

  save() {
    if (this.form().valid) {
      const formValue = this.form().value;
      if (this.isEdit() && this.task()) {
        const updatedTask: Task = { ...this.task()!, ...formValue };
        this.dialogRef.close(updatedTask);
      } else {
        this.dialogRef.close(formValue);
      }
    }
  }
}