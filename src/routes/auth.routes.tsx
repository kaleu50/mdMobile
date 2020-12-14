import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false}}>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{
        headerStyle: {
          backgroundColor: '#6272a4',
        },
      }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        headerStyle: {
          backgroundColor: '#6272a4',
        },
      }}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
