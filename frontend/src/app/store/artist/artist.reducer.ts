import { createReducer, on } from '@ngrx/store';
import { Artist } from './model/artist.interface';
import * as ArtistActions from './artist.actions';

export interface ArtistState {
  artist: Artist;
  artists: Artist[];
}

const initialState: ArtistState = {
  artist: {},
  artists: [],
};

export const artistReducer = createReducer(
  initialState,
  on(ArtistActions.getAllArtistComplete, (state, { artists }) => {
    return {
      ...state,
      artists,
    };
  }),
  on(ArtistActions.getArtistComplete, (state, { artist }) => {
    return {
      ...state,
      artist,
    };
  })
);
