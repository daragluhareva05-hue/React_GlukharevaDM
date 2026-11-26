export interface User { id: string; name: string; email: string }
export type TaskStatus = 'todo' | 'doing' | 'done';
export interface Task { id: string; userId: string; title: string; status: TaskStatus }
export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export interface TaskFilters { userId: string; status?: TaskStatus }
export interface CreateTaskRequest { userId: string; title: string; status?: TaskStatus }
export interface UpdateTaskRequest { id: string; title?: string; status?: TaskStatus }
export const statusLabels: Record<TaskStatus, string> = { todo: 'К выполнению', doing: 'В процессе', done: 'Готово' };
export const statuses: TaskStatus[] = ['todo', 'doing', 'done'];
