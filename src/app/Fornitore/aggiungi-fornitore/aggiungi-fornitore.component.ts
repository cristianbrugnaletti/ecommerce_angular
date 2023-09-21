import { Component } from '@angular/core';
import { FornitoreService } from '../fornitori/fornitore.service';
import { FornitoreDTO } from '../fornitori/fornitoreDTO';
import { Message } from 'primeng/api'; // Assicurati di importare 'Message' da primeng

@Component({
  selector: 'app-aggiungi-fornitore',
  templateUrl: './aggiungi-fornitore.component.html',
  styleUrls: ['./aggiungi-fornitore.component.css'],
})
export class AggiungiFornitoreComponent {
  fornitore: FornitoreDTO = new FornitoreDTO();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  telefonoInvalid = false;
  partitaIVAInvalid = false;





  constructor(private fornitoreService: FornitoreService) {}

  aggiungiFornitore() {

 // Esegui la validazione del numero di telefono e della Partita IVA
 if (this.fornitore && this.fornitore.numeroTelefono) {
  this.telefonoInvalid = !/^[0-9]*$/.test(this.fornitore.numeroTelefono) || this.fornitore.numeroTelefono.length < 10 || this.fornitore.numeroTelefono.length > 15;
} else {
  this.telefonoInvalid = true;
}

if (this.fornitore && this.fornitore.partitaIVA) {
  this.partitaIVAInvalid = !/^[0-9]*$/.test(this.fornitore.partitaIVA) || this.fornitore.partitaIVA.length !== 11;
} else {
  this.partitaIVAInvalid = true;
}

// Se la validazione fallisce, puoi gestire l'errore o mostrare un messaggio all'utente
if (this.telefonoInvalid || this.partitaIVAInvalid) {
  // Gestisci l'errore o mostra un messaggio all'utente
  this.errorMessage = 'Si è verificato un errore di validazione. Controlla i campi inseriti.';
  return;
}


    this.fornitoreService.aggiungiFornitore(this.fornitore).subscribe(
      (response) => {
        // Gestisci la risposta dal backend, ad esempio, mostra un messaggio di successo o reindirizza l'utente
        if (response && response.message) {
          this.successMessage = response.message;
          this.errorMessage = null;
        } else {
          console.error('Risposta del server sconosciuta:', response);
        }
      },
      (error) => {
        console.error('Si è verificato un errore durante l\'aggiunta del fornitore:', error);
        // Gestisci l'errore, ad esempio, mostra un messaggio di errore all'utente
        this.errorMessage = 'Si è verificato un errore durante l\'aggiunta del fornitore.';
        this.successMessage = null;
      }
    );
  }
}