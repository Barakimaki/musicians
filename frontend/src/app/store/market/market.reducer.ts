import { createReducer, on } from '@ngrx/store';
import { Market } from './model/market.interface';
import * as MarketActions from './market.actions';

export interface MarketState {
  marketItems: Market[];
}

const initialState: MarketState = {
  marketItems: [],
};

export const marketReducer = createReducer(
  initialState,
  on(MarketActions.getMarketItemsComplete, (state, { marketItems }) => {
    return {
      ...state,
      marketItems,
    };
  })
);
