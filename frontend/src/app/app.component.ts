import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { refresh } from './store/auth/auth.actions';
import { AppState } from './store/store';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  store = inject(Store<AppState>);
  isLoggedIn$!: Observable<boolean>;

  ngOnInit() {
    this.store.dispatch(refresh());

    this.isLoggedIn$ = this.store.select(
      (state: AppState) => state.auth.isLoggedIn
    );
  }
}
