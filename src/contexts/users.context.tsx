import React, {createContext, useContext} from 'react';

import {SignUpRequest} from 'src/services/models/signup.model';
import {User} from 'src/services/models/user.model';
import * as userService from '../services/users.service';

interface UsersContextData {
  updateUser(signUpRequest: SignUpRequest): Promise<void>;
  signUp(signUpRequest: SignUpRequest): Promise<void>;
  updateProfilePic(data: any): Promise<void>;
  getUserById(id: string): Promise<User>;

}
const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export const UserProvider: React.FC = ({children}) => {

  async function signUp(data: SignUpRequest) {
    const response = await userService.signUp(data);
  }

  async function updateUser(data: SignUpRequest) {
    return await userService.update(data);
  }

  async function updateProfilePic(data: any) {
    const response = await userService.uploadImageProfile(data);
  }

  async function getUserById(id: string) {
    return await userService.getUserById(id);
  }

  return (
    <UsersContext.Provider
      value={{
        signUp,
        updateUser,
        updateProfilePic,
        getUserById
      }}>
      {children}
    </UsersContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UsersContext);
  return context;
}
