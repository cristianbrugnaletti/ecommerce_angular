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

  private buildUrl(path: string): string {
    return `${this.apiUrl}/${path}`;
  }

  aggiungiClienteRigaDOrdine(request: ClienteRigaDOrdineRequest): Observable<ClienteRigaDOrdineDTO> {
    return this.http.post<ClienteRigaDOrdineDTO>(this.buildUrl('clienteRigaDOrdine/add'), request);
  }

  confermaOrdineCliente(request: ClienteOrdineRequest): Observable<ClienteOrdineDTO> {
    return this.http.post<ClienteOrdineDTO>(this.buildUrl('clienteOrdine/conferma'), request);
  }

  trovaOrdiniCliente(): Observable<ClienteOrdineDTO[]> {
    return this.http.get<ClienteOrdineDTO[]>(this.buildUrl('clienteOrdine/findAll'));
  }

  trovaClienti(): Observable<ClienteOrdineDTO[]> {
    return this.http.get<ClienteOrdineDTO[]>(this.buildUrl('utente/findAll'));
  }

  deleteOrdine(usernameCliente: string, dataInvioOrdine: string): Observable<void> {
    const params = new HttpParams()
      .set('usernameCliente', usernameCliente)
      .set('dataInvioOrdine', dataInvioOrdine);

    return this.http.delete<void>(this.buildUrl('clienteOrdine/delete'), { params });
  }
}
