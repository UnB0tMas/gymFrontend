// src/app/services/dashboard/cliente.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../models/dashboard/cliente.model';
import { Membresia } from '../../models/dashboard/membresia.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private url = 'https://ms2-rqe2.onrender.com/api/clientes';
  private membresiaUrl = 'https://ms2-rqe2.onrender.com/api/membresias';


  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  create(c: Cliente): Observable<Cliente> {
    const copia = {
      ...c,
      persona: {
        ...c.persona,
        fechaNacimiento: this.toIsoDate(c.persona.fechaNacimiento)
      },
      membresia: c.membresia ? { membresiaId: c.membresia.membresiaId } : null
    };
    return this.http.post<Cliente>(this.url, copia);
  }

  update(id: number, c: Cliente): Observable<Cliente> {
    const copia = {
      ...c,
      persona: {
        ...c.persona,
        fechaNacimiento: this.toIsoDate(c.persona.fechaNacimiento)
      },
      membresia: c.membresia ? { membresiaId: c.membresia.membresiaId } : null
    };
    return this.http.put<Cliente>(`${this.url}/${id}`, copia);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getMembresias(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(this.membresiaUrl);
  }

  private toIsoDate(date: any): string {
    if (typeof date === 'string') return date;
    if (date instanceof Date) {
      return date.toISOString().slice(0, 10);
    }
    return '';
  }
}
