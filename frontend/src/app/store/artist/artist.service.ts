import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  http = inject(HttpClient);

  getArtistProfile(id: number) {
    return this.http.get(`/api/artists/${id}`, {
      withCredentials: true,
    });
  }

  getAllArtists() {
    return this.http.get(`/api/artists/all`, {
      withCredentials: true,
    });
  }

  createArtist(
    name: string,
    description: string,
    bandLink: string,
    logoUrl: string
  ) {
    return this.http.post(
      `api/artists/`,
      {
        name,
        description,
        bandLink,
        logoUrl,
      },
      {
        withCredentials: true,
      }
    );
  }

  deleteArtist(id: number) {
    return this.http.delete(`api/artists/${id}`, {
      withCredentials: true,
    });
  }
}
