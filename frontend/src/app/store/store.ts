import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { ProfileState, profileReducer } from './profile/profile.reducer';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  profile: profileReducer,
};
