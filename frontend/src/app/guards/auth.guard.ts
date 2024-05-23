import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take } from 'rxjs';
import { inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/store';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  return inject(Store<AppState>).pipe(
    take(1),
    select((state: AppState) => state.auth.isLoggedIn),
    map((isLogged) => {
      return isLogged ? true : router.createUrlTree(['/auth']);
    })
  );
};
