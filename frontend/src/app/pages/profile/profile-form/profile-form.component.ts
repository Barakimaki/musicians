import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Profile } from '../../../store/profile/model/profile.interface';
import { DatePipe, formatDate } from '@angular/common';
import { updateProfile } from '../../../store/profile/profile.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent implements OnInit {
  @Input() profile!: Profile;
  @Output() onClose = new EventEmitter();
  profileForm!: FormGroup;

  file: File | null = null;

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  store = inject(Store<AppState>);

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl(this.profile.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
      ]),
      familyName: new FormControl(this.profile.familyName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
      ]),
      birthDate: new FormControl('', [Validators.required]),
    });

    this.profileForm
      .get('birthDate')
      ?.patchValue(this.formatDate(new Date(this.profile.birthDate as Date)));
  }

  onSubmit() {
    const name = this.profileForm.value.name;
    const familyName = this.profileForm.value.familyName;
    const birthDate = this.profileForm.value.birthDate;

    this.store.dispatch(
      updateProfile({
        id: this.profile.id as number,
        name,
        familyName,
        birthDate,
        avatar: this.file as File,
      })
    );
    this.onClose.emit();
  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
