import { Component } from '@angular/core';
import { FornitoreService } from '../fornitori/fornitore.service';
import { FornitoreDTO } from '../fornitori/fornitoreDTO'; // Assicurati di importare il servizio corretto
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aggiungi-fornitore',
  templateUrl: './aggiungi-fornitore.component.html',
  styleUrls: ['./aggiungi-fornitore.component.css'],
})
export class AggiungiFornitoreComponent {
  fornitore: FornitoreDTO = new FornitoreDTO(); // Assicurati di utilizzare il DTO corretto

  constructor(private fornitoreService: FornitoreService) {}

  aggiungiFornitore() {
    this.fornitoreService.aggiungiFornitore(this.fornitore).subscribe(
      (response) => {
        // Gestisci la risposta dal backend, ad esempio, mostra un messaggio di successo o reindirizza l'utente
      },
      (error) => {
        console.error('Si è verificato un errore durante l\'aggiunta del fornitore:', error);
        // Gestisci l'errore, ad esempio, mostra un messaggio di errore all'utente
      }
    );
  }
}