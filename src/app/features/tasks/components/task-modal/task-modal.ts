import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css'
})
export class TaskModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TaskModal>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly isEdit = this.data.isEdit;

  form: FormGroup = this.isEdit
    ? this.fb.group({
        title:       [this.data.task?.title       ?? '', Validators.required],
        description: [this.data.task?.description ?? ''],
        priority:    [this.data.task?.priority    ?? 'Media'],
      })
    : this.fb.group({
        title:       ['', Validators.required],
        description: [''],
        priority:    ['Media'],
        status:      ['todo'],
      });

  save(): void {
    if (this.form.invalid) return;

    if (this.isEdit && this.data.task) {
      this.dialogRef.close({ ...this.data.task, ...this.form.value });
    } else {
      this.dialogRef.close(this.form.value);
    }
  }
}
