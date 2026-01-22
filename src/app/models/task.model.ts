export interface Task {
  id: number;
  titulo: string;
  descripcion?: string;
  completada: boolean;
}

export type NewTask = Omit<Task, 'id'>;
