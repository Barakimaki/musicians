import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Market } from '../../store/market/model/market.interface';
import { AppState } from '../../store/store';
import { getMarketItems } from '../../store/market/market.actions';
import { CommonModule } from '@angular/common';
import { MarketItemComponent } from './market-item/market-item.component';
import { MarketFormComponent } from './market-form/market-form.component';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, MarketFormComponent, MarketItemComponent, MatButton],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss',
})
export class MarketComponent implements OnInit {
  store = inject(Store<AppState>);

  marketItems$!: Observable<Market[]>;

  isEdit: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(getMarketItems());
    this.marketItems$ = this.store.select(
      (state: AppState) => state.market.marketItems
    );
  }

  editItemMode() {
    this.isEdit = true;
  }

  closeEditItemMode() {
    this.isEdit = false;
  }
}
