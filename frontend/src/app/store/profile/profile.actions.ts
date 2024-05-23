import { createAction, props } from '@ngrx/store';
import { Profile } from './model/profile.interface';

export const getUserProfile = createAction('[Profile] getUserProfile');
export const getUserProfileComplete = createAction(
  '[Profile] getUserProfileComplete',
  props<{ userProfile: Profile }>()
);

export const getProfile = createAction(
  '[Profile] getUserProfile',
  props<{ id: number }>()
);
export const getProfileComplete = createAction(
  '[Profile] getUserProfileComplete',
  props<{ profile: Profile }>()
);
