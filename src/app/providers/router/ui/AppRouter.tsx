import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';
import { RouteConfig } from '@/app/providers/router/config/routerConfig';
import { AppRoutesProps } from '@/shared/types/router';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
      />
    );
  }, []);

  return <Routes>{Object.values(RouteConfig).map(renderWithWrapper)}</Routes>;
});
