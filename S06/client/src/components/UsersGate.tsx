import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { usersRequested } from '../features/users/usersSlice';
export function UsersGate({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(state => state.users);
  useEffect(() => { if (status === 'idle') dispatch(usersRequested()); }, [status, dispatch]);
  if (status === 'idle' || status === 'loading') return <p role="status">Загружаем команду...</p>;
  if (status === 'failed') return <div className="error" role="alert">Не удалось загрузить команду: {error} <button onClick={() => dispatch(usersRequested())}>Повторить</button></div>;
  return <>{children}</>;
}
