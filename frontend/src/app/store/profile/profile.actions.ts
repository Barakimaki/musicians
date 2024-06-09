import { createAction, props } from '@ngrx/store';
import { Profile } from './model/profile.interface';

export const getUserProfile = createAction('[Profile] getUserProfile');
export const getUserProfileComplete = createAction(
  '[Profile] getUserProfileComplete',
  props<{ userProfile: Profile }>()
);

export const getProfile = createAction(
  '[Profile] getProfile',
  props<{ id: number }>()
);
export const getProfileComplete = createAction(
  '[Profile] getProfileComplete',
  props<{ profile: Profile }>()
);

export const getProfiles = createAction('[Profile] getProfiles');
export const getProfilesComplete = createAction(
  '[Profile] getProfilesComplete',
  props<{ profiles: Profile[] }>()
);

export const updateProfile = createAction(
  '[Profile] updateProfile',
  props<{
    id: number;
    name: string;
    familyName: string;
    birthDate: string;
    avatar: File;
  }>()
);
