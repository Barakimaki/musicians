import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { Profile } from './model/profile.interface';

export interface ProfileState {
  userProfile: Profile;
}

const initialState: ProfileState = {
  userProfile: {},
};

export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.getUserProfileComplete, (state, { userProfile }) => {
    return {
      ...state,
      userProfile,
    };
  })
);
