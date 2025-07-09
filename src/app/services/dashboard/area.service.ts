import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../../models/dashboard/area.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AreaService {
  private url = `${environment.apiMs2}/areas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Area[]> {
    return this.http.get<Area[]>(this.url);
  }

  getActivas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.url}/activas`);
  }

  create(a: Area): Observable<Area> {
    return this.http.post<Area>(this.url, a);
  }

  update(id: number, a: Area): Observable<Area> {
    return this.http.put<Area>(`${this.url}/${id}`, a);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
