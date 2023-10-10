import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FornitoreDTO } from './fornitoreDTO';
import { FornitoreOrdineDTO } from 'src/app/OrdineFornitore/fornitoreOrdineDTO';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FornitoreService {
  private apiUrl = environment.apiUrl;

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

  modificaFornitore(id: number, fornitore: FornitoreDTO): Observable<FornitoreDTO> {
    const url = `${this.apiUrl}/modificafornitore/${id}`;
    return this.http.put<FornitoreDTO>(url, fornitore);
  }
  caricaFornitoreOrdine(): Observable<FornitoreOrdineDTO[]> {
    console.log('Chiamato caricaFornitoreOrdine()');
    return this.http.get<FornitoreOrdineDTO[]>(`${this.apiUrl}/fornitore-ordine/ordini`);
  }

  cercaFornitori(criteriRicerca: FornitoreDTO): Observable<any> {
    let params = new HttpParams();

    // Aggiungi i criteri di ricerca solo se sono stati definiti
    if (criteriRicerca.nome) {
      params = params.set('nome', criteriRicerca.nome);
    }

    if (criteriRicerca.sedeLegale) {
      params = params.set('sedeLegale', criteriRicerca.sedeLegale);
    }

    if (criteriRicerca.numeroTelefono) {
      params = params.set('numeroTelefono', criteriRicerca.numeroTelefono);
    }

    if (criteriRicerca.email) {
      params = params.set('email', criteriRicerca.email);
    }

    if (criteriRicerca.nazioneSede) {
      params = params.set('nazioneSede', criteriRicerca.nazioneSede);
    }

    if (criteriRicerca.partitaIVA) {
      params = params.set('partitaIVA', criteriRicerca.partitaIVA);
    }

    return this.http.get(`${this.apiUrl}/ricercaFornitori`, { params: params });
  }
}