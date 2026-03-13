import { Component, signal, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private authService = inject(AuthService);

  appName = signal('Todo Challenge');

  userEmail = computed(() => this.authService.currentUser()?.email ?? '');

  userInitials = computed(() => {
    const email = this.userEmail();
    return email ? email.charAt(0).toUpperCase() : '?';
  });

  logout(): void {
    this.authService.logout();
  }
}
