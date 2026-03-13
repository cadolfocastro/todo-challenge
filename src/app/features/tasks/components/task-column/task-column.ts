import { Component, Input } from '@angular/core'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { Task } from '../../models/task'
import { TaskCard } from '../task-card/task-card'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [DragDropModule, TaskCard, CommonModule],
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
  @Input() updateFn!: (task: Task) => void
}
