import { Link, NavLink, Outlet, useParams, useOutletContext } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { selectUserById } from '../app/selectors';
import { FavoriteButton } from '../components/UserCard';
import type { User } from '../types';
export function UserLayout() {
  const { userId = '' } = useParams();
  const user = useAppSelector(state => selectUserById(state, userId));
  if (!user) return <><h1>Участник не найден</h1><Link to="/users">К команде</Link></>;
  return <><Link to="/users">← Команда</Link><section className="panel"><h1>{user.name}</h1><FavoriteButton id={user.id}/><nav className="tabs"><NavLink end to={`/users/${user.id}`}>Профиль</NavLink><NavLink to={`/users/${user.id}/tasks`}>Задачи</NavLink></nav></section><Outlet context={user}/></>;
}
export function UserProfilePage() {
  const user = useOutletContext<User>();
  return <section className="panel"><h2>Информация</h2><p>Имя: {user.name}</p><p>Почта: {user.email}</p><Link to="tasks">Перейти к задачам</Link></section>;
}
