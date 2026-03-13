// Importamos el decorador Injectable desde Angular.
// Este decorador permite que esta clase pueda usarse como un servicio que Angular puede inyectar en otros componentes.
import { Injectable } from '@angular/core';

// Importo la interfaz Task que define la estructura
// que debe tener cada tarea (id, title, description, etc).
import { Task } from '../models/task';

// @Injectable le dice a Angular que esta clase es un servicio
// que puede ser inyectado mediante el sistema de Dependency Injection.
@Injectable({
  providedIn: 'root',
})
export class TaskService {

  todo: Task[] = [
    {
      id:1,
      title:'Estudiar Angular',
      description:'Repasar drag and drop',
      createdAt:new Date(),
      priority: 'Media',
      completed:false
    },
    {
      id:2,
      title:'Leer documentación',
      description:'Documentación Angular',
      createdAt:new Date(),
      priority: 'Media',
      completed:false
    }
  ];

  inProgress: Task[] = [
    {
      id:3,
      title:'Construir ToDo App',
      description:'Implementar Kanban',
      createdAt:new Date(),
      priority: 'Media',
      completed:false
    }
  ];

  done: Task[] = [
    {
      id:4,
      title:'Instalar Angular',
      description:'Instalación inicial',
      createdAt:new Date(),
      priority: 'Media',
      completed:true
    }
  ];

  todoTitle = 'To Do';
  inProgressTitle = 'In Progress';
  doneTitle = 'Done';

  addTask(title:string, description:string){

    const newTask: Task = {

      id: Date.now(),
      title,
      description,
      createdAt: new Date(),
      priority: 'Media',
      completed:false

    }

    this.todo.push(newTask)

  }

  deleteTask(task: Task, list: Task[]){

    const index = list.indexOf(task)

    if(index > -1){
      list.splice(index,1)
    }

  }

}
