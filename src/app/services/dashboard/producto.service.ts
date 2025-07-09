import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoResponseDTO, ProductoCreateDTO } from '../../models/dashboard/producto.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly apiUrl = `${environment.apiMs3}/productos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductoResponseDTO[]> {
    return this.http.get<ProductoResponseDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProductoResponseDTO> {
    return this.http.get<ProductoResponseDTO>(`${this.apiUrl}/${id}`);
  }

  buscarPorNombre(nombre: string): Observable<ProductoResponseDTO[]> {
    return this.http.get<ProductoResponseDTO[]>(`${this.apiUrl}/buscar`, {
      params: { nombre }
    });
  }

  create(dto: ProductoCreateDTO): Observable<ProductoResponseDTO> {
    return this.http.post<ProductoResponseDTO>(this.apiUrl, dto);
  }

  update(id: number, dto: ProductoCreateDTO): Observable<ProductoResponseDTO> {
    return this.http.put<ProductoResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
