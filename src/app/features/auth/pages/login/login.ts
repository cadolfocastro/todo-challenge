import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModal } from '../../../tasks/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  loading = signal(false);
  error = signal<string | null>(null);

  private readonly DEFAULT_PASSWORD = '123456';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  login(): void {
    if (this.form.invalid) {
      this.error.set('Por favor ingresa un email válido');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const email = this.form.value.email!;

    this.authService.login(email, this.DEFAULT_PASSWORD).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/task']);
      },
      error: (err) => {
        this.loading.set(false);
        const code: string = err?.error?.error?.message ?? '';
        const userNotFound = code.includes('EMAIL_NOT_FOUND') || code.includes('INVALID_LOGIN_CREDENTIALS');
        if (userNotFound) {
          this.openRegisterDialog(email);
        } else {
          this.error.set('No se pudo iniciar sesión. Intenta de nuevo.');
        }
      },
    });
  }

  private openRegisterDialog(email: string): void {
    const ref = this.dialog.open(ConfirmModal, {
      data: {
        title: 'Usuario no encontrado',
        message: `El correo ${email} no está registrado. ¿Deseas crear una cuenta?`,
        confirmLabel: 'Crear cuenta',
        confirmColor: 'primary',
      },
      width: '420px',
    });

    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.loading.set(true);
      this.authService.register(email, this.DEFAULT_PASSWORD).subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/task']);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('No se pudo crear la cuenta. Intenta de nuevo.');
        },
      });
    });
  }
}
