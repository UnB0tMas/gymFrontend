// src/app/services/dashboard/membresia.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Membresia } from '../../models/dashboard/membresia.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MembresiaService {
  // Cambia la URL si tu backend usa otro puerto o ruta
  private url = 'http://localhost:8080/api/membresias';

  constructor(private http: HttpClient) {}

  // Listar todas las membresías
  getAll(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(this.url);
  }

  // Obtener una membresía por ID
  getById(id: number): Observable<Membresia> {
    return this.http.get<Membresia>(`${this.url}/${id}`);
  }

  // Crear una nueva membresía
  create(m: Membresia): Observable<Membresia> {
    return this.http.post<Membresia>(this.url, m);
  }

  // Actualizar una membresía existente
  update(id: number, m: Membresia): Observable<Membresia> {
    return this.http.put<Membresia>(`${this.url}/${id}`, m);
  }

  // Eliminar una membresía
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
