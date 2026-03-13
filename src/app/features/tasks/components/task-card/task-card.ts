import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Task } from '../../models/task'

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {

  @Input() task?: Task
  @Output() delete = new EventEmitter<Task>()
  deleteTask(){ if (this.task) this.delete.emit(this.task) }

}
