import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { signout } from '../../store/auth/auth.actions';
import { AppState } from '../../store/store';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { UserComponent } from '../user/user.component';
import { Profile } from '../../store/profile/model/profile.interface';
import { getUserProfile } from '../../store/profile/profile.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatDividerModule, UserComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  router = inject(Router);
  store = inject(Store<AppState>);
  userProfile$!: Observable<Profile>;

  ngOnInit(): void {
    this.store.dispatch(getUserProfile());
    this.userProfile$ = this.store.select(
      (state: AppState) => state.profile.userProfile
    );
  }

  exit() {
    this.store.dispatch(signout());
  }
}
