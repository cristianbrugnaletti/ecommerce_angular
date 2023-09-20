import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FornitoreDTO } from './fornitoreDTO';

@Injectable({
  providedIn: 'root'
})
export class FornitoreService {
  private apiUrl = 'http://localhost:8080'; // URL di base del tuo backend

  constructor(private http: HttpClient) { }
  
  getFornitori(): Observable<FornitoreDTO[]> {
    console.log('Chiamato getFornitori()');
    return this.http.get<FornitoreDTO[]>(`${this.apiUrl}/trovaTuttiFornitori`);
  }

  aggiungiFornitore(fornitore: FornitoreDTO): Observable<any> {
    return this.http.post<FornitoreDTO>(`${this.apiUrl}/aggiungiFornitore`, fornitore);
  }
}