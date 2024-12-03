// ingrediente.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ingrediente {
  id?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  private apiUrl = 'http://localhost:8080/api/ingredientes';

  constructor(private http: HttpClient) {}

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl);
  }

  getIngrediente(id: number): Observable<Ingrediente> {
    return this.http.get<Ingrediente>(`${this.apiUrl}/${id}`);
  }

  addIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(this.apiUrl, ingrediente);
  }

  updateIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.put<Ingrediente>(`${this.apiUrl}/${ingrediente.id}`, ingrediente);
  }

  deleteIngrediente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
