import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleFavorite } from '../features/ui/uiSlice';
import type { User } from '../types';
export function FavoriteButton({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector(state => state.ui.favoriteUserIds.includes(id));
  return <button className="favorite" aria-pressed={favorite} onClick={() => dispatch(toggleFavorite(id))}>{favorite ? '♥ В избранном' : '♡ В избранное'}</button>;
}
export function UserCard({ user }: { user: User }) {
  return <article className="panel user-card"><div className="avatar">{user.name.split(' ').map(word => word[0]).join('')}</div><h2>{user.name}</h2><p>{user.email}</p><div className="actions"><Link to={`/users/${user.id}`}>Профиль</Link><Link to={`/users/${user.id}/tasks`}>Задачи</Link></div><FavoriteButton id={user.id}/></article>;
}
