import { lazy, Suspense } from 'react';
import { Link, NavLink, Navigate, Outlet, Route, Routes } from 'react-router';
import { useAppSelector } from './app/hooks';
import { selectFavoriteCount } from './app/selectors';
import { UsersGate } from './components/UsersGate';
import { UsersPage } from './pages/UsersPage';
import { UserLayout, UserProfilePage } from './pages/UserLayout';
import { UserTasksPage } from './pages/UserTasksPage';
const TaskPage = lazy(() => import('./pages/TaskPage'));
function Layout() {
  const count = useAppSelector(selectFavoriteCount);
  return <><header><Link className="brand" to="/users">team / tasks</Link><nav><NavLink to="/users">Команда</NavLink><NavLink to="/favorites">Избранное ({count})</NavLink></nav></header><main><Outlet/></main></>;
}
export default function App() {
  return <Routes><Route element={<Layout/>}><Route index element={<Navigate to="/users" replace/>}/><Route element={<UsersGate><Outlet/></UsersGate>}><Route path="users" element={<UsersPage/>}/><Route path="favorites" element={<UsersPage favorites/>}/><Route path="users/:userId" element={<UserLayout/>}><Route index element={<UserProfilePage/>}/><Route path="tasks" element={<UserTasksPage/>}/></Route></Route><Route path="tasks/:taskId" element={<Suspense fallback={<p>Загружаем страницу...</p>}><TaskPage/></Suspense>}/><Route path="*" element={<><h1>404</h1><p>Страница не найдена.</p><Link to="/users">К команде</Link></>}/></Route></Routes>;
}
