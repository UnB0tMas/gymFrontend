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
    if (token) {
      return true;
    }
    // Si no hay token, redirige a login
    return this.router.createUrlTree(['/login']);
  }
}
