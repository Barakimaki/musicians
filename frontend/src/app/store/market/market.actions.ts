import { createAction, props } from '@ngrx/store';
import { Market } from './model/market.interface';

export const getMarketItems = createAction(`[Market] getMarketItems`);
export const getMarketItemsComplete = createAction(
  `[Market] getMarketItemsComplete`,
  props<{ marketItems: Market[] }>()
);

export const createMarketItem = createAction(
  `[Market] createMarketItem`,
  props<{
    name: string;
    description: string;
    price: number;
    photo: File;
  }>()
);

export const deleteMarketItem = createAction(
  `[Market] deleteMarketItem`,
  props<{
    id: number;
  }>()
);
