import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  // Skip token injection for Firebase Auth REST API and the backend login endpoint
  if (
    req.url.includes('identitytoolkit.googleapis.com') ||
    req.url.endsWith('/auth/login')
  ) {
    return next(req);
  }

  if (token) {
    return next(
      req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }),
    );
  }

  return next(req);
};
