import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { ProfileState, profileReducer } from './profile/profile.reducer';
import { ArtistState, artistReducer } from './artist/artist.reducer';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
  artist: ArtistState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  profile: profileReducer,
  artist: artistReducer,
};
