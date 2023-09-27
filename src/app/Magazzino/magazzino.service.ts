import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MagazzinoDTO } from './MagazzinoDTO';

@Injectable({
  providedIn: 'root'
})
export class MagazzinoService {
  private apiUrl = 'http://192.168.239.133:8080/MagazzinoController';

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
  } }
