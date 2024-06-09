import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { Observable } from 'rxjs';
import { Profile } from '../../store/profile/model/profile.interface';
import { getProfiles } from '../../store/profile/profile.actions';
import { RouterModule } from '@angular/router';
import { UserComponent } from '../../components/user/user.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [RouterModule, CommonModule, UserComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',
})
export class ProfilesComponent implements OnInit {
  store = inject(Store<AppState>);

  userId$!: Observable<number>;
  profiles$!: Observable<Profile[]>;

  ngOnInit(): void {
    this.store.dispatch(getProfiles());
    this.userId$ = this.store.select(
      (state: AppState) => state.profile.userProfile.user?.id as number
    );
    this.profiles$ = this.store.select(
      (state: AppState) => state.profile.profiles
    );
  }
}
