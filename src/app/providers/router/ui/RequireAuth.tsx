import { getUserAuthData, getUserRoles, UserRole } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useMemo, useState } from 'react';
import { ForbiddenPage } from 'pages/ForbiddenPage';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const isAuth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }

    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!isAuth) return <Navigate to={RoutePath.main} state={{ from: location }} replace />;

  if (!hasRequiredRoles) return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;

  return children;
};
