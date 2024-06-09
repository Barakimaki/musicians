import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { createArtist } from '../../../store/artist/artist.actions';

@Component({
  selector: 'app-artist-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './artist-form.component.html',
  styleUrl: './artist-form.component.scss',
})
export class ArtistFormComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  artistForm!: FormGroup;

  file: File | null = null;

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  store = inject(Store<AppState>);

  ngOnInit(): void {
    this.artistForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000),
      ]),
      bandLink: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000),
      ]),
    });
  }

  closeForm() {
    this.onClose.emit();
  }

  onSubmit() {
    const name = this.artistForm.value.name;
    const description = this.artistForm.value.description;
    const bandLink = this.artistForm.value.bandLink;

    if (this.file) {
      this.store.dispatch(
        createArtist({
          name,
          description,
          bandLink,
          logo: this.file,
        })
      );

      this.closeForm();
    }
  }
}
