import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteRigaDOrdineRequest } from './clienteRigaDOrdineRequest';
import { ClienteRigaDOrdineDTO } from './clienteRigaDOrdineDTO';
import { ClienteOrdineRequest } from '../clienteOrdineRequest';
import { ClienteOrdineDTO } from '../clienteOrdineDTO';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteOrdineService {
  private apiUrl = environment.apiUrl; 

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
deleteOrdine(usernameCliente: string, dataInvioOrdine: string): Observable<void> {
  console.log('Chiamato delete');
  const url = `${this.apiUrl}/ClienteController/clienteOrdine/delete`; 
  const params = new HttpParams()
    .set('usernameCliente', usernameCliente)
    .set('dataInvioOrdine', dataInvioOrdine);
  
  return this.http.delete<void>(url, { params });
}
}
