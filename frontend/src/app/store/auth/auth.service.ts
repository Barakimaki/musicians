import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface AuthResponseData {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  signup(email: string, username: string, password: string) {
    return this.http.post<AuthResponseData>(
      '/api/auth/signup',
      {
        email,
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  signin(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      '/api/auth/signin',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  signout() {
    return this.http.get('/api/auth/signout', {
      withCredentials: true,
    });
  }

  refresh() {
    return this.http.get<AuthResponseData>('/api/auth/refresh', {
      withCredentials: true,
    });
  }
}
