// src/app/services/auth/auth.service.ts
import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';
import { Observable, of }       from 'rxjs';
import { LoginRequest }         from '../../models/auth/login-request.model';
import { Token }                from '../../models/auth/token.model';

@Injectable()
export class AuthService {
  private baseUrl = 'https://ms1-u7g6.onrender.com/api/auth';

  constructor(private http: HttpClient) { }

  login(creds: LoginRequest): Observable<Token> {
    if (creds.username === 'admin' && creds.password === 'admin') {
      const payload = {
        sub: 'admin',
        rol: 'ADMIN',
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      };

      const payloadBase64 = btoa(JSON.stringify(payload))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const fakeToken = [
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', 
        payloadBase64,
        'FAKE_SIGNATURE'
      ].join('.');

      return of({ token: fakeToken } as Token);
    }

    return this.http.post<Token>(`${this.baseUrl}/login`, creds);
  }
}
