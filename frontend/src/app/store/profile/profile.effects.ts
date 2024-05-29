import { Injectable, inject } from '@angular/core';
import * as ProfileActions from './profile.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from './profile.service';
import { exhaustMap, map } from 'rxjs';
import { Profile } from './model/profile.interface';

@Injectable()
export class ProfileEffects {
  private actions$ = inject(Actions);
  private profileService = inject(ProfileService);

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

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.updateProfile),
      exhaustMap((action) => {
        const { id, name, familyName, birthDate, avatarUrl } = action;
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
