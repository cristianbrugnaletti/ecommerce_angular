import { Component } from '@angular/core';
import { ClienteDTO } from './clienteDTO';
import { ClienteService } from './cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente-component.component.html',
  styleUrls: ['./cliente-component.component.css']
})
export class ClienteComponent {
  
  clienti: ClienteDTO[] = []; // Assicurati che il tipo di dati corrisponda a ciò che restituisce il servizio
  clienteDaModificareIndex: number | null = null;
  userOriginale: string | null = null;
  clienteDaEliminareIndex: number | null = null;
  searchForm: FormGroup;
  mostraFormRicerca = false;

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      nome: [''],
      cognome: [''],
      email: [''],
      username: ['']
    });
   }

  ngOnInit() {
    this.trovaClienti();
  }

  trovaClienti() {
    this.clienteService.getClienti().subscribe((data: ClienteDTO[]) => {
      this.clienti = data; // Assegna i dati ricevuti alla variabile fornitori
    });
  }

  eliminaCliente(username: string) {
    this.clienteService.eliminaCliente(username).subscribe((data: ClienteDTO) => {
      this.clienti = this.clienti.filter(c => c.username !== username);
      alert("Cliente eliminato con successo!");
    },
     (error) => {
      alert("Impossibile eliminare il cliente perchè ha degli ordini associati!");
     })
  }

  modificaCliente(index: number) {
    if (this.clienteDaModificareIndex === index) {
      // Se il form è già aperto e stai cliccando di nuovo su "Modifica",
      // chiudi il form settando il valore a null
      this.clienteDaModificareIndex = null;
      this.userOriginale = null;
    } else {
      this.clienteDaModificareIndex = index;
      this.userOriginale = this.clienti[index]?.username || null;
    }
  }

  confermaModifica(clienteModificato: ClienteDTO) {
    if (this.clienteDaModificareIndex !== null) {
      this.clienti[this.clienteDaModificareIndex] = clienteModificato;
    }

    this.clienteDaModificareIndex = null;
    this.userOriginale = null;
    this.trovaClienti();
  }

  annullaModifica() {
    this.clienteDaModificareIndex = null;
    this.userOriginale = null;
  }

  eliminazioneConfermata() {
    if (this.userOriginale && this.clienteDaEliminareIndex !== null) {
      this.userOriginale = null;
      this.clienteDaEliminareIndex = null;
      this.trovaClienti();
    }
  }

  annullaEliminazioneCliente() {
    this.clienteDaEliminareIndex = null;
    this.userOriginale = null;
  }

  ricercaCliente() {
    const criteria = this.searchForm.value;
    
    // Verifica che le chiavi siano presenti prima di effettuare la richiesta HTTP
    if ('nome' in criteria || 'cognome' in criteria || 'email' in criteria || 'username' in criteria) {
      this.clienteService.cercaClienti(criteria.nome, criteria.cognome, criteria.email, criteria.username)
        .subscribe(
          (data: ClienteDTO[]) => {
            this.clienti = data;
          },
          (error) => {
            alert("Il cliente che hai ricercato non esiste!");
            console.error('Si è verificato un errore durante la ricerca dei clienti:', error);
          }
        );
    }
  }
  
  toggleRicerca() {
    this.mostraFormRicerca = !this.mostraFormRicerca;
    this.trovaClienti();
    this.searchForm.reset();
  }
}
