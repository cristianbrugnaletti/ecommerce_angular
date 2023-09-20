import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MagazzinoDTO } from './MagazzinoDTO';

@Injectable({
  providedIn: 'root'
})
export class MagazzinoService {
  private apiUrl = 'http://localhost:8080/MagazzinoController'; // URL relativo al tuo controller Spring

  constructor(private http: HttpClient) { }

  getMagazzini(): Observable<MagazzinoDTO[]> {
    // Effettua la chiamata HTTP per ottenere l'elenco dei magazzini dal tuo backend
    return this.http.get<any[]>(`${this.apiUrl}/visualizzaTuttiIMagazzini`);
  }
}
