import React  from 'react';
import { useAuth } from '../contexts/auth.context';
import { ActivityIndicator, View } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes'

const Routes: React.FC = ()  =>{
    const { signed, loading } = useAuth();

    
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#030303" />
      </View>
    );
  }

    return  signed ? <AppRoutes/> : <AuthRoutes/>;
}

export default Routes;