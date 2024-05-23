import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  getUserProfile() {
    return this.http.get('/api/profile', {
      withCredentials: true,
    });
  }

  getProfile(id: number) {
    return this.http.get(`/api/profile/${id}`, {
      withCredentials: true,
    });
  }
}
