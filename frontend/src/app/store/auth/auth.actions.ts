import { createAction, props } from '@ngrx/store';

export const refresh = createAction('[Auth] refresh');
export const signup = createAction(
  '[Auth] signUp',
  props<{
    email: string;
    username: string;
    password: string;
  }>()
);
export const signin = createAction(
  '[Auth] signIn',
  props<{
    email: string;
    password: string;
  }>()
);
export const authComplete = createAction(
  '[Auth] AuthComplete',
  props<{
    accessToken: string;
  }>()
);
export const signout = createAction('[Auth] signOut');
export const signoutComplete = createAction('[Auth] signOutComplete');
