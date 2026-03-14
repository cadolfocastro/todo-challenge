import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  login(): void {
    if (this.form.invalid) {
      this.error.set('Por favor ingresa email y contraseña');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { email, password } = this.form.value;

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/task']);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Credenciales inválidas. Verifica tu email y contraseña.');
      },
    });
  }
}
