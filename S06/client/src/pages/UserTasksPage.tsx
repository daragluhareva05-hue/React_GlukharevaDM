import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router';
import { useGetTasksQuery, useAddTaskMutation } from '../features/tasks/tasksApi';
import { statuses, statusLabels } from '../types';
import type { User, TaskStatus } from '../types';
export function UserTasksPage() {
  const user = useOutletContext<User>();
  const [params, setParams] = useSearchParams();
  const status = statuses.find(value => value === params.get('status'));
  const { currentData, isLoading, isFetching, isError, refetch } = useGetTasksQuery(status ? { userId: user.id, status } : { userId: user.id });
  const [addTask, { isLoading: saving }] = useAddTaskMutation();
  const [title, setTitle] = useState('');
  const [newStatus, setNewStatus] = useState<TaskStatus>('todo');
  const [message, setMessage] = useState('');
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) { setMessage('Введите название задачи'); return; }
    try { await addTask({ userId: user.id, title: title.trim(), status: newStatus }).unwrap(); setTitle(''); setMessage('Задача создана'); }
    catch { setMessage('Не удалось создать задачу. Повторите попытку.'); }
  }
  return <><section className="panel"><h2>Новая задача</h2><form onSubmit={submit}><label>Название<input value={title} onChange={e => setTitle(e.target.value)}/></label><label>Статус<select value={newStatus} onChange={e => setNewStatus(e.target.value as TaskStatus)}>{statuses.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}</select></label><button disabled={saving}>{saving ? 'Сохраняем...' : 'Добавить'}</button></form>{message && <p role="status">{message}</p>}</section><section className="panel"><div className="heading"><h2>Задачи</h2><button onClick={() => refetch()} disabled={isFetching}>Обновить</button></div><label>Фильтр<select value={status ?? 'all'} onChange={e => { const next = new URLSearchParams(params); if (e.target.value === 'all') next.delete('status'); else next.set('status', e.target.value); setParams(next); }}><option value="all">Все задачи</option>{statuses.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}</select></label>{(isLoading || (isFetching && !currentData)) && <p role="status">Загрузка задач...</p>}{isFetching && currentData && <p role="status">Обновляем список...</p>}{isError && <p className="error" role="alert">Не удалось загрузить задачи. <button onClick={() => refetch()}>Повторить</button></p>}{!isError && !isFetching && currentData?.length === 0 && <p>Нет задач с выбранным статусом. Создайте новую задачу.</p>}{currentData?.map(task => <article className="task" key={task.id}><Link to={`/tasks/${task.id}`}>{task.title}</Link><span className={`status ${task.status}`}>{statusLabels[task.status]}</span></article>)}</section></>;
}
