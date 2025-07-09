
// src/app/viewmodels/auth/login.viewmodel.ts

import { Injectable }   from '@angular/core';
import { Router }       from '@angular/router';
import { AuthService }  from '../../services/auth/auth.service';
import { LoginRequest } from '../../models/auth/login-request.model';

@Injectable({ providedIn: 'root' })
export class LoginViewModel {
  username = '';
  password = '';
  errorMsg = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.errorMsg = '';
    const creds: LoginRequest = {
      username: this.username,
      password: this.password
    };
    this.auth.login(creds).subscribe({
      next: res => {
        // Guarda el token y redirige al dashboard
        localStorage.setItem('jwt', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        // Muestra mensaje de error si las credenciales son incorrectas
        this.errorMsg = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
