import { Task, NewTask } from '../models/task.model';

export interface ApiTask {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}

export type ApiNewTask = Omit<ApiTask, 'id'>;

export function fromApiTask(a: ApiTask): Task {
    return {
        id: a.id,
        titulo: a.title,
        descripcion: a.description,
        completada: a.completed,
    };
}

export function toApiNewTask(t: NewTask): ApiNewTask {
    return {
        title: t.titulo,
        description: t.descripcion ?? '',
        completed: t.completada,
    };
}
