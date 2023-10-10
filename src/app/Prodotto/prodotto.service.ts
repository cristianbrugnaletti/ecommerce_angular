import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdottoDTO } from './prodottoDTO';
import { ProdottoRequest } from './prodottoRequest';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  private apiUrl = environment.apiUrl;

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
  }

  rimuoviProdotto(nome: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/prodotto/delete/${nome}`);
  }

  modificaProdotto(nome: string, prodotto: ProdottoDTO): Observable<ProdottoDTO> {
    return this.http.put<ProdottoDTO>(`${this.apiUrl}/prodotto/modifica/${nome}`, prodotto);
  }
  
  aggiungiProdotto(request: ProdottoRequest): Observable<ProdottoDTO> {
    console.log('Chiamato aggiungiProdotto()');
    return this.http.post<ProdottoDTO>(`${this.apiUrl}/prodotto/add`, request);
  }

  cercaProdotti(nome?: string, descrizione?: string, prezzo?: number): Observable<ProdottoDTO[]> {
    // Crea un oggetto per i parametri che devono essere inclusi nella richiesta
    const params: any = {};
    
    // Aggiungi solo i parametri che sono definiti
    if (nome) params['nome'] = nome;
    if (descrizione) params['descrizione'] = descrizione;
    if (prezzo) params['prezzo'] = prezzo.toString();

    // Passa l'oggetto dei parametri alla richiesta HTTP
    return this.http.get<ProdottoDTO[]>(`${this.apiUrl}/cercaProdotti`, { params });
  }

  cercaProdottoPerNome(searchTerm: string): Observable<string[]> {
    return this.http
      .get<ProdottoDTO[]>(`${this.apiUrl}/cercaProdottoPerNome?nome=${searchTerm}`)
      .pipe(
        map((prodotti: ProdottoDTO[]) => prodotti.map(prodotto => prodotto.nome || '')) // Assicurati che il nome non sia undefined
      );
  }

  private selectedProductName: string = '';

  setSelectedProductName(productName: string) {
    this.selectedProductName = productName;
  }

  getSelectedProductName(): string {
    return this.selectedProductName;
  }
} 