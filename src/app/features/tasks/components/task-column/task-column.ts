import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { Task } from '../../models/task'
import { TaskCard } from '../task-card/task-card'

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskCard],
  templateUrl: './task-column.html',
  styleUrl: './task-column.css'
})
export class TaskColumn {
  @Input() title!: string
  @Input() tasks: Task[] = []
  @Input() listId = ''
  @Input() connectedTo: string[] = []
  @Input() dropFn: Function = () => {}
  @Input() deleteFn: Function = () => {}
}
