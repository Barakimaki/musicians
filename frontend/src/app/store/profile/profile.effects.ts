import { Injectable, inject } from '@angular/core';
import * as ProfileActions from './profile.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from './profile.service';
import { exhaustMap, map, from, switchMap } from 'rxjs';
import { Profile } from './model/profile.interface';
import { FileUploadService } from './../fileupload.service';

@Injectable()
export class ProfileEffects {
  private actions$ = inject(Actions);
  private profileService = inject(ProfileService);
  private fileUploadService = inject(FileUploadService);

  getUserProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.getUserProfile),
      exhaustMap(() => {
        return this.profileService.getUserProfile().pipe(
          map((userProfile: Profile) => {
            return ProfileActions.getUserProfileComplete({
              userProfile,
            });
          })
        );
      })
    );
  });

  getProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.getProfile),
      exhaustMap((action) => {
        return this.profileService.getProfile(action.id).pipe(
          map((profile: Profile) => {
            return ProfileActions.getProfileComplete({
              profile,
            });
          })
        );
      })
    );
  });

  getProfiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.getProfiles),
      exhaustMap((action) => {
        return this.profileService.getAllProfiles().pipe(
          map((profiles) => {
            return ProfileActions.getProfilesComplete({
              profiles: profiles as Profile[],
            });
          })
        );
      })
    );
  });

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.updateProfile),
      switchMap((action) => {
        const { id, name, familyName, birthDate, avatar } = action;

        return from(
          this.fileUploadService.uploadFile(avatar, 'avatar', String(id))
        ).pipe(
          map((avatarUrl) => {
            return { id, name, familyName, birthDate, avatarUrl };
          })
        );
      }),
      exhaustMap((data) => {
        const { id, name, familyName, birthDate, avatarUrl } = data;

        return this.profileService
          .updateProfile(id, name, familyName, birthDate, avatarUrl)
          .pipe(
            map((profile: Profile) => {
              return ProfileActions.getProfileComplete({
                profile,
              });
            })
          );
      })
    );
  });
}
