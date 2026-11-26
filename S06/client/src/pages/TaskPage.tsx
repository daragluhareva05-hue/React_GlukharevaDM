import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useGetTaskQuery, useUpdateTaskMutation, useDeleteTaskMutation } from '../features/tasks/tasksApi';
import { statuses, statusLabels } from '../types';
import type { Task, TaskStatus } from '../types';
function TaskForm({ task }: { task: Task }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [message, setMessage] = useState('');
  const [updateTask, { isLoading: saving }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: deleting }] = useDeleteTaskMutation();
  const back = `/users/${task.userId}/tasks`;
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) { setMessage('Введите название'); return; }
    try { await updateTask({ id: task.id, title: title.trim(), status }).unwrap(); navigate(back); }
    catch { setMessage('Не удалось сохранить задачу. Повторите попытку.'); }
  }
  async function remove() {
    if (!window.confirm('Удалить задачу?')) return;
    try { await deleteTask(task.id).unwrap(); navigate(back); }
    catch { setMessage('Не удалось удалить задачу. Повторите попытку.'); }
  }
  return <section className="panel"><Link to={back}>← К задачам</Link><h1>Редактирование задачи</h1><form onSubmit={save}><label>Название<input value={title} onChange={e => setTitle(e.target.value)}/></label><label>Статус<select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>{statuses.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}</select></label><div className="actions"><button disabled={saving || deleting}>{saving ? 'Сохраняем...' : 'Сохранить'}</button><button type="button" className="danger" disabled={saving || deleting} onClick={remove}>Удалить</button></div></form>{message && <p role="alert" className="error">{message}</p>}</section>;
}
export default function TaskPage() {
  const { taskId = '' } = useParams();
  const { currentData: task, isFetching, isError, error, refetch } = useGetTaskQuery(taskId, { skip: !taskId });
  const missing = error && 'status' in error && error.status === 404;
  if (missing) return <><h1>Задача не найдена</h1><Link to="/users">К команде</Link></>;
  return <>{isFetching && <p role="status">{task ? 'Обновляем задачу...' : 'Загружаем задачу...'}</p>}{isError && <p role="alert" className="error">Не удалось загрузить задачу. <button onClick={() => refetch()}>Повторить</button></p>}{task && <TaskForm key={task.id} task={task}/>}</>;
}
