import { createAction, props } from '@ngrx/store';
import { Artist } from './model/artist.interface';

export const getArtist = createAction(
  `[Artist] getArtist`,
  props<{ id: number }>()
);
export const getArtistComplete = createAction(
  `[Artist] getArtistComplete`,
  props<{ artist: Artist }>()
);

export const getAllArtist = createAction(`[Artist] getAllArtist`);
export const getAllArtistComplete = createAction(
  `[Artist] getAllArtistComplete`,
  props<{ artists: Artist[] }>()
);

export const createArtist = createAction(
  `[Artist] createArtist`,
  props<{
    name: string;
    description: string;
    bandLink: string;
    logo: File;
  }>()
);

export const deleteArtist = createAction(
  `[Artist] deleteArtist`,
  props<{
    id: number;
  }>()
);
