import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  accessToken: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  accessToken: '',
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authComplete, (state, { accessToken }) => {
    return {
      ...state,
      accessToken,
      isLoggedIn: true,
    };
  }),

  on(AuthActions.signoutComplete, (state) => {
    return {
      ...state,
      accessToken: '',
      isLoggedIn: false,
    };
  })
);
