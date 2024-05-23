import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Profile } from '../../store/profile/model/profile.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input() profile!: Profile;

  router = inject(Router);
}
