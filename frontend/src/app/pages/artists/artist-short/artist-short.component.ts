import { Component, Input, inject } from '@angular/core';
import { Artist } from '../../../store/artist/model/artist.interface';
import { Router, RouterModule } from '@angular/router';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-artist-short',
  standalone: true,
  imports: [RouterModule, MatIcon],
  templateUrl: './artist-short.component.html',
  styleUrl: './artist-short.component.scss',
})
export class ArtistShortComponent {
  @Input() artist!: Artist;

  router = inject(Router);
}
