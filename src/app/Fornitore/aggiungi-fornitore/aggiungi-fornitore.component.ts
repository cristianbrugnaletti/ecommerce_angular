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

  constructor(private fornitoreService: FornitoreService) {}

  aggiungiFornitore() {
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