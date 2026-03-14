import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user';

interface BackendAuthResponse {
  uid: string;
  email: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  private http = inject(HttpClient);
  private router = inject(Router);

  token = signal<string | null>(localStorage.getItem('auth_token'));
  currentUser = signal<User | null>(this.restoreUser());
  isLoggedIn = computed(() => !!this.token());

  private restoreUser(): User | null {
    try {
      const stored = localStorage.getItem('auth_user');
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  }

  private saveSession(res: BackendAuthResponse): void {
    const user: User = { email: res.email };
    this.token.set(res.token);
    this.currentUser.set(user);
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  login(email: string, password: string): Observable<void> {
    return this.http
      .post<BackendAuthResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(res => this.saveSession(res)),
        map(() => void 0 as void),
      );
  }

  register(email: string, password: string): Observable<void> {
    return this.http
      .post<BackendAuthResponse>(`${environment.apiUrl}/auth/register`, { email, password })
      .pipe(
        tap(res => this.saveSession(res)),
        map(() => void 0 as void),
      );
  }

  logout(): void {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }
}
