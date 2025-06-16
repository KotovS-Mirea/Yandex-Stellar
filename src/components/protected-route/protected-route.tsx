import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsInitialized,
  selectIsAuthenticated
} from '../../services/slices/appInitStateSlice';
import { Preloader } from '../ui/preloader';
import { useAppSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyForUnauthorized?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyForUnauthorized
}: ProtectedRouteProps) => {
  const isAppInitialized = useAppSelector(selectIsInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentLocation = useLocation();

  if (!isAppInitialized) {
    return <Preloader />;
  }

  if (onlyForUnauthorized && isAuthenticated) {
    return (
      <Navigate replace to={currentLocation.state?.from || { pathname: '/' }} />
    );
  }

  if (!onlyForUnauthorized && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: currentLocation }} />;
  }

  return children;
};
