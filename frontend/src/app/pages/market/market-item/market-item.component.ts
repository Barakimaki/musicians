import { Component, Input, OnInit, inject } from '@angular/core';
import { Market } from '../../../store/market/model/market.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/store';
import { deleteMarketItem } from '../../../store/market/market.actions';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './market-item.component.html',
  styleUrl: './market-item.component.scss',
})
export class MarketItemComponent implements OnInit {
  store = inject(Store<AppState>);
  @Input() item!: Market;
  isDelete: boolean = false;

  userId$!: Observable<number>;

  ngOnInit(): void {
    this.userId$ = this.store.select(
      (state: AppState) => state.profile.userProfile.user?.id as number
    );
  }

  onDelete() {
    this.store.dispatch(deleteMarketItem({ id: this.item.id as number }));
  }
}
