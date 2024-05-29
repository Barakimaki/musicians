import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { Observable, Subscription, map, switchMap, take } from 'rxjs';
import { Profile } from '../../store/profile/model/profile.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getProfile } from '../../store/profile/profile.actions';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MatButtonModule } from '@angular/material/button';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ProfileInfoComponent,
    ProfileFormComponent,
    MatButtonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);

  userId$!: Observable<number>;
  profile$!: Observable<Profile>;
  profileIdSub!: Subscription;
  isEdit: boolean = false;

  ngOnInit(): void {
    this.profileIdSub = this.activatedRoute.params.subscribe((p) =>
      this.store.dispatch(getProfile({ id: p['profileId'] }))
    );

    this.userId$ = this.store.select(
      (state: AppState) => state.profile.userProfile.user?.id as number
    );
    this.profile$ = this.store.select(
      (state: AppState) => state.profile.profile
    );
  }

  ngOnDestroy(): void {
    this.profileIdSub.unsubscribe();
  }

  editProfileMode() {
    this.isEdit = true;
  }

  closeEditProfileMode() {
    this.isEdit = false;
  }
}
