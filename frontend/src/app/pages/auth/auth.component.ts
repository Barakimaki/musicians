import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { signin, signup } from '../../store/auth/auth.actions';
import { AppState } from '../../store/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';

  authForm!: FormGroup;

  store = inject(Store<AppState>);
  router = inject(Router);

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        this.isLoginMode ? Validators.nullValidator : Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ]),
    });
  }

  ngOnDestroy() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const email = this.authForm.value.email;
    const username = this.authForm.value.username;
    const password = this.authForm.value.password;
    if (this.isLoginMode) {
      this.store.dispatch(signin({ email, password }));
    } else {
      this.store.dispatch(signup({ email, username, password }));
    }
  }
}
