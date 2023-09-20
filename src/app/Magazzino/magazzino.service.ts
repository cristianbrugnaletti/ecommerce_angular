import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MagazzinoDTO } from './MagazzinoDTO';

@Injectable({
  providedIn: 'root'
})
export class MagazzinoService {
  private apiUrl = 'http://localhost:8080/MagazzinoController';

  constructor(private http: HttpClient) { }

  getMagazzini(): Observable<MagazzinoDTO[]> {
    return this.http.get<MagazzinoDTO[]>(`${this.apiUrl}/visualizzaTuttiIMagazzini`);
  }
  aggiungiMagazzino(magazzino: MagazzinoDTO): Observable<MagazzinoDTO> {
    return this.http.post<MagazzinoDTO>(`${this.apiUrl}/aggiungiMagazzino`, magazzino);
  }  
}
