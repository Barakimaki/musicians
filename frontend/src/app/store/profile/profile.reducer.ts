import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { Profile } from './model/profile.interface';

export interface ProfileState {
  userProfile: Profile;
  profile: Profile;
  profiles: Profile[];
}

const initialState: ProfileState = {
  userProfile: {},
  profile: {},
  profiles: [],
};

export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.getUserProfileComplete, (state, { userProfile }) => {
    return {
      ...state,
      userProfile,
    };
  }),
  on(ProfileActions.getProfileComplete, (state, { profile }) => {
    return {
      ...state,
      profile,
    };
  }),
  on(ProfileActions.getProfilesComplete, (state, { profiles }) => {
    return {
      ...state,
      profiles,
    };
  })
);
