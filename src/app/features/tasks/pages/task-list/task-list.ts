import { Component } from '@angular/core'

import { FormsModule } from '@angular/forms'
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Task } from '../../models/task'
import { TaskService } from '../../services/task.service'
import { TaskForm } from "../../components/task-form/task-form";
import { TaskColumn } from '../../components/task-column/task-column'


@Component({
 selector:'app-task-list',
 standalone: true,
 imports: [
    DragDropModule,
    FormsModule,
    TaskForm,
    TaskColumn
],

 templateUrl:'./task-list.html',
 styleUrl: './task-list.css'
})

export class TaskList {


  constructor(public taskService: TaskService){}



  drop(event: CdkDragDrop<Task[]>){

    if(event.previousContainer === event.container){

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )

    }else{

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )

    }

  }

  deleteTask(task:Task, list:Task[]){

    this.taskService.deleteTask(task,list)

  }
  updateTask(updatedTask: Task){

  const lists = [
    this.taskService.todo,
    this.taskService.inProgress,
    this.taskService.done
  ]

  lists.forEach(list => {

    const index = list.findIndex(t => t.id === updatedTask.id)

    if(index !== -1){
      list[index] = updatedTask
    }

  })

}


}
