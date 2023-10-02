import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FornitoreDTO } from './fornitoreDTO';
import { FornitoreOrdineDTO } from 'src/app/OrdineFornitore/fornitoreOrdineDTO';

@Injectable({
  providedIn: 'root'
})
export class FornitoreService {
  private apiUrl = 'http://192.168.239.133:8080'; // URL di base del tuo backend

  constructor(private http: HttpClient) { }
  
  getFornitori(): Observable<FornitoreDTO[]> {
    console.log('Chiamato getFornitori()');
    return this.http.get<FornitoreDTO[]>(`${this.apiUrl}/trovaTuttiFornitori`);
  }

  aggiungiFornitore(fornitore: FornitoreDTO): Observable<any> {
    return this.http.post<FornitoreDTO>(`${this.apiUrl}/aggiungiFornitore`, fornitore);
  }

  eliminaFornitore(fornitoreId: number): Observable<void> {
    const url = `${this.apiUrl}/elimina/${fornitoreId}`;
    return this.http.delete<void>(url);
  }

  modificaFornitore(partitaIVA: string, fornitore: FornitoreDTO): Observable<FornitoreDTO> {
    const url = `${this.apiUrl}/modificafornitore/${partitaIVA}`;
    return this.http.put<FornitoreDTO>(url, fornitore);
  }
  caricaFornitoreOrdine(): Observable<FornitoreOrdineDTO[]> {
    console.log('Chiamato caricaFornitoreOrdine()');
    return this.http.get<FornitoreOrdineDTO[]>(`${this.apiUrl}/fornitore-ordine/ordini`);
  }

  cercaFornitori(criteriRicerca: FornitoreDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/cerca`, criteriRicerca);
  }
}