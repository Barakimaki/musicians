import { Component, Input } from '@angular/core';
import { Profile } from '../../../store/profile/model/profile.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent {
  @Input() profile!: Profile;
}
