import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth.service';
import * as userService from '../services/users.service';

import api from '../services/api.service';
import {LoginRequest} from '../services/models/login.model';
import {SignUpRequest} from '../services/models/signup.model';
import { User } from 'src/services/models/user.model';
var jwtDecode = require('jwt-decode');


interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(loginRequest: LoginRequest): Promise<void>;
  logout(): void;
  signUp(signUpRequest: SignUpRequest): Promise<void>;
  updateToken(updatedToken: any): Promise<void>;
  updateLocalUser(newUser: any): Promise<void>;
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
        api.defaults.headers['Authorization'] = `${storagedToken}`;
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }
    loadStoragedData();
  }, []);

  async function signIn(loginData: LoginRequest) {
    const response = await auth.signIn(loginData);
    setUser(jwtDecode(response.authJwtToken));

    api.defaults.headers['Authorization'] = `${response.authJwtToken}`;

    await AsyncStorage.setItem(
      '@RNAAuth:user',
      JSON.stringify(jwtDecode(response.authJwtToken)),
    );
    await AsyncStorage.setItem('@RNAAuth:token', response.authJwtToken);
  }

  async function updateLocalUser(newUser: User) {
    await AsyncStorage.setItem('@RNAAuth:user', JSON.stringify(newUser));
    await setUser(newUser);
  }

  async function updateToken(tokenUpdated: any) {
    await AsyncStorage.setItem('@RNAAuth:token', tokenUpdated.authJwtToken);
  }

  async function signUp(data: SignUpRequest) {
    const response = await userService.signUp(data);
  }

  async function logout() {
    AsyncStorage.clear().then(() => {
      api.defaults.headers['Authorization'] = ``;

      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user: user,
        loading,
        signIn,
        logout,
        signUp,
        updateToken,
        updateLocalUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
