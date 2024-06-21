import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { Observable } from 'rxjs';
import { Artist } from '../../store/artist/model/artist.interface';
import { getAllArtist } from '../../store/artist/artist.actions';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArtistShortComponent } from './artist-short/artist-short.component';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ArtistFormComponent,
    ArtistShortComponent,
    MatButton,
  ],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss',
})
export class ArtistsComponent implements OnInit {
  store = inject(Store<AppState>);

  artists$!: Observable<Artist[]>;

  isEdit: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(getAllArtist());
    this.artists$ = this.store.select(
      (state: AppState) => state.artist.artists
    );
  }

  editProfileMode() {
    this.isEdit = true;
  }

  closeEditArtistMode() {
    this.isEdit = false;
  }
}
