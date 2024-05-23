import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs';
import { AppState } from '../store/store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  inject(Store<AppState>)
    .pipe(
      take(1),
      select((state: AppState) => state.auth.accessToken),
      map((accessToken) => accessToken)
    )
    .subscribe((accessToken) => {
      if (accessToken) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
        });
        req = cloned;
      }
    });
  return next(req);
};
