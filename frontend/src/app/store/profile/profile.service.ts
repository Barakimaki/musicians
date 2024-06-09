import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  getUserProfile() {
    return this.http.get('/api/profile/user', {
      withCredentials: true,
    });
  }

  getProfile(id: number) {
    return this.http.get(`/api/profile/${id}`, {
      withCredentials: true,
    });
  }

  getAllProfiles() {
    return this.http.get(`/api/profile/profiles`, {
      withCredentials: true,
    });
  }

  updateProfile(
    id: number,
    name: string,
    familyName: string,
    birthDate: string,
    avatarUrl: string
  ) {
    return this.http.post(
      `/api/profile/user/${id}`,
      {
        name,
        familyName,
        birthDate,
        avatarUrl,
      },
      {
        withCredentials: true,
      }
    );
  }
}
