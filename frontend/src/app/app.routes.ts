import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ChatComponent } from './pages/chat/chat.component';
import { authGuard } from './guards/auth.guard';
import { MarketComponent } from './pages/market/market.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { EventsComponent } from './pages/events/events.component';
import { ArtistComponent } from './pages/artist/artist.component';

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'events', component: EventsComponent, canActivate: [authGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: 'market', component: MarketComponent, canActivate: [authGuard] },
  { path: 'lessons', component: LessonsComponent, canActivate: [authGuard] },
  { path: 'artists', component: ArtistsComponent, canActivate: [authGuard] },
  {
    path: 'artist/:artistId',
    component: ArtistComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/:profileId',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: EventsComponent,
    canActivate: [authGuard],
  },
];
