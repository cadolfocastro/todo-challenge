import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  newTitle = ''
  newDescription = '';
  newPriority = 'Media';

  constructor(private taskService: TaskService) {}
  addTask(){
    if(!this.newTitle.trim()) return // esto hace que no se puedan agregar tareas vacias
    this.taskService.todo.push({
      id: Date.now(),
      title: this.newTitle,
      description: this.newDescription,
      createdAt: new Date(),
      priority: this.newPriority
    })

    this.newTitle = ''
    this.newDescription = ''
  }

}

