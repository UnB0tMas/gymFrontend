import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Membresia } from '../../models/dashboard/membresia.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MembresiaService {
  private url = `${environment.apiMs2}/membresias`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(this.url);
  }

  getById(id: number): Observable<Membresia> {
    return this.http.get<Membresia>(`${this.url}/${id}`);
  }

  create(m: Membresia): Observable<Membresia> {
    return this.http.post<Membresia>(this.url, m);
  }

  update(id: number, m: Membresia): Observable<Membresia> {
    return this.http.put<Membresia>(`${this.url}/${id}`, m);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
