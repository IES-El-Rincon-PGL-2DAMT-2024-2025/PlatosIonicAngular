// plato.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ingrediente } from './ingrediente.service';

export interface Plato {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  ingredientes?: Ingrediente[];
}

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  private apiUrl = 'http://localhost:8080/api/platos';

  constructor(private http: HttpClient) {}

  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }

  getPlato(id: number): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  addPlato(plato: Plato): Observable<Plato> {
    return this.http.post<Plato>(this.apiUrl, plato);
  }

  updatePlato(plato: Plato): Observable<Plato> {
    return this.http.put<Plato>(`${this.apiUrl}/${plato.id}`, plato);
  }

  deletePlato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
