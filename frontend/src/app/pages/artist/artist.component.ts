import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { Artist } from '../../store/artist/model/artist.interface';
import { Observable, Subscription, map, take } from 'rxjs';
import { deleteArtist, getArtist } from '../../store/artist/artist.actions';
import { ArtistInfoComponent } from './artist-info/artist-info.component';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, ArtistInfoComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);

  artistIdSub!: Subscription;
  isDelete: boolean = false;

  userId$!: Observable<number>;
  artist$!: Observable<Artist>;

  ngOnInit(): void {
    this.artistIdSub = this.activatedRoute.params.subscribe((p) =>
      this.store.dispatch(getArtist({ id: p['artistId'] }))
    );

    this.userId$ = this.store.select(
      (state: AppState) => state.profile.userProfile.user?.id as number
    );

    this.artist$ = this.store.select((state: AppState) => state.artist.artist);
  }

  ngOnDestroy(): void {
    this.artistIdSub.unsubscribe();
  }

  onDelete() {
    this.artist$.pipe(
      take(1),
      map((artist) => {
        this.store.dispatch(deleteArtist({ id: artist.id as number }));
      })
    );
  }
}
