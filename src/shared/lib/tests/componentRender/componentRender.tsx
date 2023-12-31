import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Theme } from '@/shared/const/theme';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

interface TestProviderProps {
  children: ReactNode;
  options?: ComponentRenderOptions;
  theme?: Theme;
}

export const TestProvider = (props: TestProviderProps) => {
  const { children, options = {}, theme = Theme.LIGHT } = props;
  const { route = '/', initialState, asyncReducers } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
        <ThemeProvider initialTheme={theme}>
          <div className={`app ${theme}`}>
            <I18nextProvider i18n={i18nForTests}>{children}</I18nextProvider>
          </div>
        </ThemeProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
