import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Task } from '../../models/task'
import { MatButton, MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-edit-task-modal',
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './edit-task-modal.html',
  styleUrl: './edit-task-modal.css',
})
export class EditTaskModal {
constructor(
    public dialogRef: MatDialogRef<EditTaskModal>,
    @Inject(MAT_DIALOG_DATA) public task: Task
  ) {}

  save(){
    this.dialogRef.close(this.task)
  }
}
