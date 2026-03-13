export interface Task{
  id: number
  title: string
  description: string
  createdAt: Date
  priority: string;
  completed?: boolean
}
