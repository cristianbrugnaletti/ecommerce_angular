import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteRigaDOrdineRequest } from './clienteRigaDOrdineRequest';
import { ClienteRigaDOrdineDTO } from './clienteRigaDOrdineDTO';
import { ClienteOrdineRequest } from '../clienteOrdineRequest';
import { ClienteOrdineDTO } from '../clienteOrdineDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteOrdineService {
  private apiUrl = 'http://localhost:8080'; // Sostituisci con l'URL del tuo backend

  constructor(private http: HttpClient) { }

  aggiungiClienteRigaDOrdine(request: ClienteRigaDOrdineRequest): Observable<ClienteRigaDOrdineDTO> {
    const url = `${this.apiUrl}/ClienteRigaDOrdineController/clienteRigaDOrdine/add`;
    return this.http.post<ClienteRigaDOrdineDTO>(url, request);
  }

  confermaOrdineCliente(request: ClienteOrdineRequest): Observable<ClienteOrdineDTO> {
    const url = `${this.apiUrl}/ClienteController/clienteOrdine/conferma`;
    return this.http.post<ClienteOrdineDTO>(url, request);
  }
  
}
