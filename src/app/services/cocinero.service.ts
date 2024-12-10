import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cocinero {
  id?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class CocineroService {
  private apiUrl = 'http://localhost:8080/api/cocineros';

  constructor(private http: HttpClient) {}

  getCocineros(): Observable<Cocinero[]> {
    return this.http.get<Cocinero[]>(this.apiUrl);
  }

  addCocinero(cocinero: Cocinero): Observable<Cocinero> {
    return this.http.post<Cocinero>(this.apiUrl, cocinero);
  }

  updateCocinero(id: number, cocinero: Cocinero): Observable<Cocinero> {
    return this.http.put<Cocinero>(`${this.apiUrl}/${id}`, cocinero);
  }

  deleteCocinero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
