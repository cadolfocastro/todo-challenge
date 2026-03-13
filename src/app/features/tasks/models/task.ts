export interface Task {
  id: string;
  userId?: string;
  title: string;
  description: string;
  createdAt: Date | string;
  priority: 'Baja' | 'Media' | 'Alta' | string;
  status: 'todo' | 'inProgress' | 'done';
  completed?: boolean;
}
