import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../../models/dashboard/empleado.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private url = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.url);
  }

  getById(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.url}/${id}`);
  }

  create(e: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.url, e);
  }

  update(id: number, e: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.url}/${id}`, e);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
