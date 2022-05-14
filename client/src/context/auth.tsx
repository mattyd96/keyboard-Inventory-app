import React, { createContext, Reducer, useReducer } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';

type User = {
  id: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

type UserData = {
  _typename: string;
  id: string;
  email: string;
  username: string;
  createdAt: string;
  token: string;
}

type AuthContent = {
  user: User | null;
  login: Function;
  logout: Function;
}

type State = {
  user: UserData | User | null;
}

type Action = {
  type: string;
  payload?: UserData;
}

const initialState: State = { user: null };

const token = localStorage.getItem('jwtToken');

if(token) {
  const decodedToken = jwtDecode<User>(token);

  if(decodedToken.exp! * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = decodedToken;
  }
}


const AuthContext = createContext<AuthContent>({
  user: null,
  login: (userData : UserData) => {},
  logout: () => {}
});

function authReducer(state: State, action: Action): State {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload!
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

function AuthProvider(props : any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: UserData) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    })
  }

  const logout = () => {
    localStorage.removeItem('jwtToken');
    dispatch({type: 'LOGOUT'});
  }

  return (
    <AuthContext.Provider 
      value={{ user: state.user, login, logout }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }