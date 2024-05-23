import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { appReducer } from './store/store';
import { authInterceptor } from './interceptors/auth.interceptor';
import { ProfileEffects } from './store/profile/profile.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideStore(appReducer),
    provideEffects(AuthEffects, ProfileEffects),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'bsu-musicians',
        appId: '1:882767409955:web:d2cb073e503fa66d191296',
        storageBucket: 'bsu-musicians.appspot.com',
        apiKey: 'AIzaSyBoqCX5on9UhzQ8UgXfpOH2XDlScUSDwVg',
        authDomain: 'bsu-musicians.firebaseapp.com',
        messagingSenderId: '882767409955',
        measurementId: 'G-QV2NY4B832',
      })
    ),
    provideStorage(() => getStorage()),
  ],
};
