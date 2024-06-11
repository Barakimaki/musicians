import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FileUploadService } from '../fileupload.service';
import { MarketService } from './market.service';
import * as MarketActions from './market.actions';
import { exhaustMap, from, map, switchMap } from 'rxjs';
import { Market } from './model/market.interface';

@Injectable()
export class MarketEffects {
  private actions$ = inject(Actions);
  private marketService = inject(MarketService);
  private fileUploadService = inject(FileUploadService);

  getMarketItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketActions.getMarketItems),
      exhaustMap((action) => {
        return this.marketService.getAllMarketItems().pipe(
          map((items) => {
            return MarketActions.getMarketItemsComplete({
              marketItems: items as Market[],
            });
          })
        );
      })
    );
  });

  createMarketItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketActions.createMarketItem),
      switchMap((action) => {
        const { name, description, price, photo } = action;
        return from(
          this.fileUploadService.uploadFile(
            photo,
            'photo',
            name + price + Math.random() * 100000
          )
        ).pipe(
          map((photoUrl) => {
            return { name, description, price, photoUrl };
          })
        );
      }),
      exhaustMap((data) => {
        const { name, description, price, photoUrl } = data;

        return this.marketService
          .createMarketItem(name, description, photoUrl, price)
          .pipe(
            map(() => {
              return MarketActions.getMarketItems();
            })
          );
      })
    );
  });

  deleteMarketItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MarketActions.deleteMarketItem),
      exhaustMap((action) => {
        return this.marketService.deleteArtist(action.id).pipe(
          map(() => {
            return MarketActions.getMarketItems();
          })
        );
      })
    );
  });
}
