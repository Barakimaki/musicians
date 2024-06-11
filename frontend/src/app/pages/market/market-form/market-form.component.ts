import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppState } from '../../../store/store';
import { Store } from '@ngrx/store';
import { createMarketItem } from '../../../store/market/market.actions';

@Component({
  selector: 'app-market-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './market-form.component.html',
  styleUrl: './market-form.component.scss',
})
export class MarketFormComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  marketForm!: FormGroup;

  file: File | null = null;

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  store = inject(Store<AppState>);

  ngOnInit(): void {
    this.marketForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(230),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000),
      ]),
      price: new FormControl(0, [Validators.required]),
    });
  }

  closeForm() {
    this.onClose.emit();
  }

  onSubmit() {
    const name = this.marketForm.value.name;
    const description = this.marketForm.value.description;
    const price = this.marketForm.value.price;
    if (this.file) {
      this.store.dispatch(
        createMarketItem({
          name,
          description,
          price,
          photo: this.file,
        })
      );

      this.closeForm();
    }
  }
}
