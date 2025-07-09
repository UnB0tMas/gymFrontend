//src/app/services/dashboard/categoria-p.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaPResponseDTO, CategoriaPCreateDTO } from '../../models/dashboard/categoria-p.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaPService {
  private readonly apiUrl = 'https://ms3-3enf.onrender.com/api/categorias';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoriaPResponseDTO[]> {
    return this.http.get<CategoriaPResponseDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<CategoriaPResponseDTO> {
    return this.http.get<CategoriaPResponseDTO>(`${this.apiUrl}/${id}`);
  }

  buscarPorNombre(nombre: string): Observable<CategoriaPResponseDTO[]> {
    return this.http.get<CategoriaPResponseDTO[]>(`${this.apiUrl}/buscar`, {
      params: { nombre }
    });
  }

  create(dto: CategoriaPCreateDTO): Observable<CategoriaPResponseDTO> {
    return this.http.post<CategoriaPResponseDTO>(this.apiUrl, dto);
  }

  update(id: number, dto: CategoriaPCreateDTO): Observable<CategoriaPResponseDTO> {
    return this.http.put<CategoriaPResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
