import { Component, Input } from '@angular/core';
import { Artist } from '../../../store/artist/model/artist.interface';

@Component({
  selector: 'app-artist-info',
  standalone: true,
  imports: [],
  templateUrl: './artist-info.component.html',
  styleUrl: './artist-info.component.scss',
})
export class ArtistInfoComponent {
  @Input() artist!: Artist;
}
