import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { NavBar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { Suspense } from 'react';

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <NavBar />
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};