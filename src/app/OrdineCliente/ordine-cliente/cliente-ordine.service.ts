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
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  aggiungiClienteRigaDOrdine(request: ClienteRigaDOrdineRequest): Observable<ClienteRigaDOrdineDTO> {
    const url = `${this.apiUrl}/ClienteRigaDOrdineController/clienteRigaDOrdine/add`;
    return this.http.post<ClienteRigaDOrdineDTO>(url, request);
  }

  confermaOrdineCliente(request: ClienteOrdineRequest): Observable<ClienteOrdineDTO> {
    const url = `${this.apiUrl}/ClienteController/clienteOrdine/conferma`;
    return this.http.post<ClienteOrdineDTO>(url, request);
  }

  trovaOrdiniCliente(): Observable<ClienteOrdineDTO[]> {
    console.log('Chiamato getOrdiniCliente()');
    return this.http.get<ClienteOrdineDTO[]>(`${this.apiUrl}/ClienteController/clienteOrdine/findAll`);
  }
 trovaClienti(): Observable<ClienteOrdineDTO[]> {
  console.log('Chiamato getOrdiniCliente()');
  return this.http.get<ClienteOrdineDTO[]>(`${this.apiUrl}/utente/findAll`);
}
}
