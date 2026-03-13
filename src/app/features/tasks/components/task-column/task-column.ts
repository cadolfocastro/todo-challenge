import { Component, input } from '@angular/core'
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
  title = input.required<string>();
  tasks = input<Task[]>([]);
  listId = input<string>('');
  connectedTo = input<string[]>([]);
  dropFn = input<Function>(() => {});
  deleteFn = input<Function>(() => {});
  updateFn = input.required<(task: Task) => void>();
}
