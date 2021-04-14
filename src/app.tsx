import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProviderComponent } from 'core/theme';
import { ApplicationContextProvider } from 'common-app/context';
import { RouterComponent } from 'core/router';

const App: React.FunctionComponent = () => {
  return (
    <ApplicationContextProvider>
      <RouterComponent />
    </ApplicationContextProvider>
  );
};

const AppProviders: React.FunctionComponent = () => {
  return (
    <ThemeProviderComponent>
      <App />
    </ThemeProviderComponent>
  );
};

export default hot(AppProviders);
