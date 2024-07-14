import { ROUTE_PATH } from '../constant/route-path.constant';
import { HomePage } from '../pages/Home';
import { LoginPage } from '../pages/Login';

export const APP_ROUTES = [
  {
    id: 'auth-login',
    path: ROUTE_PATH.AUTH.LOGIN,
    private: false,
    exact: true,
    component: <LoginPage />,
  },
  {
    id: 'home-feed',
    path: ROUTE_PATH.HOME.FEED,
    private: true,
    exact: true,
    component: <HomePage />,
  },
];
