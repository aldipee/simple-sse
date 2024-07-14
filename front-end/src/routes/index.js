import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { APP_ROUTES } from './declaration.route';
import { PrivateRouteWrapper } from './private-route.component';
import { PageNotFound } from '../pages/NotFound';

export const AppRoutesElements = createBrowserRouter(
  createRoutesFromElements(
    <>
      {APP_ROUTES.map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={
            <PrivateRouteWrapper
              allowedRoles={route.allowedRoles}
              isPrivate={route.private}
              accessAdminRightLevel={route.accressAdminRightLevel}
            >
              {route.component}
            </PrivateRouteWrapper>
          }
        />
      ))}
      <Route path='*' element={<PageNotFound />} />
    </>
  )
);
