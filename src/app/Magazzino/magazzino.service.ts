import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MagazzinoDTO } from './MagazzinoDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MagazzinoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMagazzini(): Observable<MagazzinoDTO[]> {
    return this.http.get<MagazzinoDTO[]>(`${this.apiUrl}/visualizzaTuttiIMagazzini`);
  }

  aggiungiMagazzino(magazzino: MagazzinoDTO): Observable<MagazzinoDTO> {
    return this.http.post<MagazzinoDTO>(`${this.apiUrl}/aggiungiMagazzino`, magazzino);
  }

  modificaMagazzino(nome: string, magazzino: MagazzinoDTO): Observable<MagazzinoDTO> {
    return this.http.put<MagazzinoDTO>(`${this.apiUrl}/modificaMagazzino/${nome}`, magazzino);
  }

  eliminaMagazzino(nome: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminaMagazzino?nome=${nome}`);
  }

  cercaMagazzini(nome?: string, indirizzo?: string, sede?: string, capacitaMassima?: number): Observable<MagazzinoDTO[]> {
    // Crea un oggetto per i parametri che devono essere inclusi nella richiesta
    const params: any = {};
    
    // Aggiungi solo i parametri che sono definiti
    if (nome) params['nome'] = nome;
    if (indirizzo) params['indirizzo'] = indirizzo;
    if (sede) params['sede'] = sede;
    if (capacitaMassima) params['capacitaMassima'] = capacitaMassima.toString();

    // Passa l'oggetto dei parametri alla richiesta HTTP
    return this.http.get<MagazzinoDTO[]>(`${this.apiUrl}/cercaMagazzini`, { params });
  }
}
