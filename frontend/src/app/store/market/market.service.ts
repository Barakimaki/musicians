import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  http = inject(HttpClient);

  getAllMarketItems() {
    return this.http.get(`/api/market/`, {
      withCredentials: true,
    });
  }

  createMarketItem(
    name: string,
    description: string,
    photoUrl: string,
    price: number
  ) {
    return this.http.post(
      `api/market/`,
      {
        name,
        description,
        photoUrl,
        price,
      },
      {
        withCredentials: true,
      }
    );
  }

  deleteArtist(id: number) {
    return this.http.delete(`api/market/${id}`, {
      withCredentials: true,
    });
  }
}
