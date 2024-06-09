import { Injectable, inject } from '@angular/core';
import * as ArtistActions from './artist.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FileUploadService } from '../fileupload.service';
import { ArtistService } from './artist.service';
import { exhaustMap, from, map, switchMap } from 'rxjs';
import { Artist } from './model/artist.interface';

@Injectable()
export class ArtistEffects {
  private actions$ = inject(Actions);
  private artistService = inject(ArtistService);
  private fileUploadService = inject(FileUploadService);

  getArtist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistActions.getArtist),
      exhaustMap((action) => {
        return this.artistService.getArtistProfile(action.id).pipe(
          map((artist) => {
            return ArtistActions.getArtistComplete({
              artist: artist as Artist,
            });
          })
        );
      })
    );
  });

  getAllArtists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistActions.getAllArtist),
      exhaustMap((action) => {
        return this.artistService.getAllArtists().pipe(
          map((artists) => {
            return ArtistActions.getAllArtistComplete({
              artists: artists as Artist[],
            });
          })
        );
      })
    );
  });

  createArtist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistActions.createArtist),
      switchMap((action) => {
        const { name, description, bandLink, logo } = action;
        return from(this.fileUploadService.uploadFile(logo, 'logo', name)).pipe(
          map((logoUrl) => {
            return { name, description, bandLink, logoUrl };
          })
        );
      }),
      exhaustMap((data) => {
        const { name, description, bandLink, logoUrl } = data;

        return this.artistService
          .createArtist(name, description, bandLink, logoUrl)
          .pipe(
            map(() => {
              return ArtistActions.getAllArtist();
            })
          );
      })
    );
  });

  deleteArtist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistActions.deleteArtist),
      exhaustMap((action) => {
        return this.artistService.deleteArtist(action.id).pipe(
          map(() => {
            return ArtistActions.getAllArtist();
          })
        );
      })
    );
  });
}
