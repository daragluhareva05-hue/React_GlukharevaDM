import { useAppSelector } from '../app/hooks';
import { selectUsers, selectFavorites } from '../app/selectors';
import { UserCard } from '../components/UserCard';
export function UsersPage({ favorites = false }: { favorites?: boolean }) {
  const users = useAppSelector(favorites ? selectFavorites : selectUsers);
  return <><h1>{favorites ? 'Избранное' : 'Команда'}</h1><p className="muted">{favorites ? 'Участники, которых вы отметили' : 'Участники и их задачи'}</p>{users.length ? <div className="grid">{users.map(user => <UserCard key={user.id} user={user}/>)}</div> : <p className="panel">{favorites ? 'Пока нет избранных участников.' : 'Команда пуста.'}</p>}</>;
}
