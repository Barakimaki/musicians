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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

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
        appId: process.env['FIREBASE_APP_ID'],
        storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
        apiKey: process.env['FIREBASE_API_KEY'],
        authDomain: process.env['FIREBASE_AUTH_DOMAIN'],
        messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'],
        measurementId: process.env['FIREBASE_MEASUREMENT_ID'],
      })
    ),
    provideStorage(() => getStorage()),
  ],
};
