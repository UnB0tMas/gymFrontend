// src/app/services/auth/auth.guard.ts
import { Injectable }       from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('jwt');

    // Si no hay token o es inválido, redirige a login
    if (!token || !this.isValidJwt(token)) {
      localStorage.removeItem('jwt');
      return this.router.createUrlTree(['/login']);
    }

    return true;
  }

  // Valida formato y expiración del JWT (sin verificar firma)
  private isValidJwt(token: string): boolean {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    try {
      const payloadBase64 = parts[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      // Debe tener campo exp (UNIX time en segundos)
      if (!payload.exp) {
        return false;
      }

      const nowInSeconds = Math.floor(Date.now() / 1000);
      return payload.exp > nowInSeconds;
    } catch {
      return false;
    }
  }
}
