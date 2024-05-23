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
}
