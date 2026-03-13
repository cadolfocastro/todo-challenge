import { Component, signal } from '@angular/core'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../services/auth.service'

@Component({
  selector:'app-login',
  standalone:true,
  imports:[FormsModule, CommonModule],
  templateUrl:'./login.html',
  styleUrls:['./login.css']
})
export class Login {

  email = ''
  password = ''
  loading = signal(false)
  error = signal<string | null>(null)

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) {
      this.error.set('Por favor ingresa email y contraseña')
      return
    }

    this.loading.set(true)
    this.error.set(null)

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false)
        this.router.navigate(['/task'])
      },
      error: () => {
        this.loading.set(false)
        this.error.set('Credenciales inválidas. Verifica tu email y contraseña.')
      },
    })
  }

}
