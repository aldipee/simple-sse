import { Navigate } from 'react-router-dom';
import { getLocalStorageAccessToken } from '../lib/Axios';
import { ROUTE_PATH } from '../constant/route-path.constant';

export function PrivateRouteWrapper({ children, isPrivate = false, allowedRoles = [], accessAdminRightLevel }) {
  const accessToken = getLocalStorageAccessToken();

  if (!isPrivate) return children;

  if (isPrivate) {
    if (!accessToken) return <Navigate to={ROUTE_PATH.AUTH.LOGIN} />;
  }

  return children;
}
