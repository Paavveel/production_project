import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { AppRouter } from './AppRouter';
import { getRouteAbout, getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { UserRole } from '@/entities/User';

describe('app/router/AppRouter', () => {
  it('route should render', async () => {
    componentRender(<AppRouter />, { route: getRouteAbout() });

    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });

  it('route does not found', async () => {
    componentRender(<AppRouter />, { route: '/asdasdasd' });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  it('should redirect when unauthorized', async () => {
    componentRender(<AppRouter />, { route: getRouteProfile('1') });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  it('should redirect when authorized', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: {
          _inited: true,
          authData: {},
        },
      },
    });

    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });

  it('should redirect when role does not exist', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          _inited: true,
          authData: {},
        },
      },
    });

    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });

  it('should redirect when role exist', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          _inited: true,
          authData: { roles: [UserRole.ADMIN] },
        },
      },
    });

    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
});
