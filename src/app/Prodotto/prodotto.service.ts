import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdottoDTO } from './prodottoDTO'; 

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  // Metodo per ottenere l'elenco dei prodotti
  getProdotti(): Observable<ProdottoDTO[]> {
    return this.http.get<ProdottoDTO[]>(`${this.apiUrl}/prodotto/findAll`);
  }

  // Aggiungi altri metodi per gestire le operazioni CRUD sui prodotti, se necessario
}
