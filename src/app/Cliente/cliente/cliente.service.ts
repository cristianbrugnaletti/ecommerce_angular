import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from './clienteDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://192.168.239.133:8080'; // URL di base del tuo backend

  constructor(private http: HttpClient) { }
  
  getClienti(): Observable<ClienteDTO[]> {
    console.log('Chiamato getClienti()');
    return this.http.get<ClienteDTO[]>(`${this.apiUrl}/utente/findAll`);
  }

  modificaCliente(username:string, cliente: ClienteDTO): Observable<ClienteDTO> {
    console.log('Chiamato modificaCliente()');
    return this.http.put<ClienteDTO>(`${this.apiUrl}/utente/modifica?username=${username}`, cliente);
  }

  eliminaCliente(username: string): Observable<ClienteDTO> {
    console.log('Chiamato eliminaCliente()');
    return this.http.delete<ClienteDTO>(`${this.apiUrl}/utente/elimina/${username}`);
  }

  aggiungiCliente(cliente: ClienteDTO): Observable<ClienteDTO> {
    console.log('Chiamato aggiungiCliente()');
    return this.http.post<ClienteDTO>(`${this.apiUrl}/utente/add`, cliente);
  }
    
}