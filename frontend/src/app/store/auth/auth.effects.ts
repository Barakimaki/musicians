import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { catchError, exhaustMap, map } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private authService = inject(AuthService);
  private location = inject(Location);

  authSignUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap((action) => {
        return this.authService
          .signup(action.email, action.username, action.password)
          .pipe(
            map((authResponse: AuthResponseData) => {
              this.router.navigate(['/']);
              return AuthActions.authComplete({
                accessToken: authResponse.accessToken,
              });
            })
          );
      })
    );
  });

  authSignIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signin),
      exhaustMap((action) => {
        return this.authService.signin(action.email, action.password).pipe(
          map((authResponse: AuthResponseData) => {
            this.router.navigate(['/']);
            return AuthActions.authComplete({
              accessToken: authResponse.accessToken,
            });
          })
        );
      })
    );
  });

  authRefresh$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.refresh),
      exhaustMap((action) => {
        return this.authService.refresh().pipe(
          map((authResponse: AuthResponseData) => {
            this.location.back();
            return AuthActions.authComplete({
              accessToken: authResponse.accessToken,
            });
          })
        );
      })
    );
  });

  authSignOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signout),
      exhaustMap(() => {
        return this.authService.signout().pipe(
          map(() => {
            this.router.navigate(['/auth']);
            return AuthActions.signoutComplete();
          })
        );
      })
    );
  });
}
