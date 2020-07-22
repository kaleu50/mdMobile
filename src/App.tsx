import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './contexts/auth.context';

import Routes from './routes';
import {UserProvider} from './contexts/users.context';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
