import {createContext, useContext} from 'react';
import {SignUpRequest} from 'src/services/models/signup.model';
import {User} from 'src/services/models/user.model';
import * as userService from '../services/users.service';

interface UsersContextData {
  //   user: User | null;
  //   loading: boolean;
  updateUser(signUpRequest: SignUpRequest): Promise<void>;
  signUp(signUpRequest: SignUpRequest): Promise<void>;
}
const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export const UserProvider: React.FC = ({children}) => {

  async function signUp(data: SignUpRequest) {
    const response = await userService.signUp(data);
  }

  async function updateUser(data: SignUpRequest) {
    const response = await userService.signUp(data);
  }

  return (
    <UsersContext.Provider
      value={{
        signUp,
        updateUser
      }}>
      {children}
    </UsersContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UsersContext);
  return context;
}
