import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdottoDTO } from './prodottoDTO';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  private apiUrl = 'http://192.168.239.133:8080';

  constructor(private http: HttpClient) { }

  // Metodo per ottenere l'elenco dei prodotti
  getProdotti(): Observable<ProdottoDTO[]> {
    return this.http.get<ProdottoDTO[]>(`${this.apiUrl}/prodotto/findAll`);
  }
  importaProdottiDaExcel(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders(); // Aggiungi intestazioni se necessario

    return this.http.post<string>(`${this.apiUrl}/ControllerDataLoader/prodotto/upload`, formData, { headers, responseType: 'text' as 'json' });
  }}
