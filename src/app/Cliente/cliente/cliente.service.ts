import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from './clienteDTO';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.apiUrl;

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

  cercaClienti(username?: string, nome?: string, cognome?: string, email?: string): Observable<ClienteDTO[]> {
    // Crea un oggetto per i parametri che devono essere inclusi nella richiesta
    const params: any = {};
    
    // Aggiungi solo i parametri che sono definiti
    if (username) params['username'] = username;
    if (nome) params['nome'] = nome;
    if (cognome) params['cognome'] = cognome;
    if (email) params['email'] = email;

    // Passa l'oggetto dei parametri alla richiesta HTTP
    return this.http.get<ClienteDTO[]>(`${this.apiUrl}/cercaClienti`, { params });
  }
    
}