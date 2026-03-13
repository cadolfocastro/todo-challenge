import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './create-task-modal.html',
  styleUrl: './create-task-modal.css'
})
export class CreateTaskModal {

    task = {
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo'
  }

  constructor(private dialogRef: MatDialogRef<CreateTaskModal>) {}

  save(){

    if(!this.task.title || this.task.title.trim() === ''){
      return
    }

    this.dialogRef.close(this.task)

  }

}
