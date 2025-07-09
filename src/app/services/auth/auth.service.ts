import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';
import { Observable }           from 'rxjs';
import { LoginRequest }         from '../../models/auth/login-request.model';
import { Token }                from '../../models/auth/token.model';

@Injectable()
export class AuthService {
  private baseUrl = 'http://localhost:8082/api/auth';

  constructor(private http: HttpClient) { }

  login(creds: LoginRequest): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/login`, creds);
  }
}
