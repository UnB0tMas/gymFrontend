// src/app/services/auth/auth.interceptor.ts
import { Injectable }             from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable }             from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt');

    // No añadimos Authorization si no hay token o no tiene formato JWT
    if (!token || token.split('.').length !== 3) {
      return next.handle(req);
    }

    // Clona la petición e inyecta el header Authorization
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next.handle(authReq);
  }
}
