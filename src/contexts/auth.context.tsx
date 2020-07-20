import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth.service';
import * as userService from '../services/users.service';

import api from '../services/api.service';
import { LoginRequest } from 'src/services/models/login.model';
var jwtDecode = require('jwt-decode');

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(loginRequest: LoginRequest): Promise<void>;
  logout(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStoragedData() {
      const storageUser = await AsyncStorage.getItem('@RNAAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAAuth:token');


      if (storageUser && storagedToken) {
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

    }
    loadStoragedData();
  }, []);

  async function signIn(loginData: LoginRequest) {
    
    const response = await auth.signIn(loginData);
    console.log('response', response);
    setUser(jwtDecode(response.authJwtToken));

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    await AsyncStorage.setItem('@RNAAuth:user', JSON.stringify(jwtDecode(response.authJwtToken)));
    await AsyncStorage.setItem('@RNAAuth:token', response.authJwtToken);
  }



  async function logout() {
    AsyncStorage.clear().then(() => {
      api.defaults.headers['Authorization'] = ``;

      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, 
        user: user, loading, 
        signIn, 
        logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
