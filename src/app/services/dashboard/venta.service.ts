import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentaCreateDTO, VentaResponseDTO } from '../../models/dashboard/venta.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private readonly apiUrl = `${environment.apiMs3}/ventas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<VentaResponseDTO[]> {
    return this.http.get<VentaResponseDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<VentaResponseDTO> {
    return this.http.get<VentaResponseDTO>(`${this.apiUrl}/${id}`);
  }

  create(dto: VentaCreateDTO): Observable<VentaResponseDTO> {
    return this.http.post<VentaResponseDTO>(this.apiUrl, dto);
  }

  update(id: number, dto: VentaCreateDTO): Observable<VentaResponseDTO> {
    return this.http.put<VentaResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
