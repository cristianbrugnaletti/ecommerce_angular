import { Component } from '@angular/core';
import { MagazzinoDTO } from '../MagazzinoDTO';
import { MagazzinoService } from '../magazzino.service';

@Component({
  selector: 'app-aggiungi-magazzino',
  templateUrl: './aggiungi-magazzino.component.html',
  styleUrls: ['./aggiungi-magazzino.component.css'],
})
export class AggiungiMagazzinoComponent {
  magazzino: MagazzinoDTO = new MagazzinoDTO();
  successMessage: string | null = null; // Inizializza a null
  errorMessage: string | null = null; // Inizializza a null

  constructor(private magazzinoService: MagazzinoService) {}

  aggiungiMagazzino() {
    this.magazzinoService.aggiungiMagazzino(this.magazzino).subscribe(
      (response) => {
        // Gestisci la risposta del server
        console.log('Risposta del server:', response);
        if (response.message) {
          // Se la risposta contiene un messaggio, mostra il messaggio di successo
          this.successMessage = response.message;
          this.errorMessage = null; // Assicurati che il messaggio di errore sia vuoto
        } else {
          console.error('Risposta del server sconosciuta:', response);
        }
      },
      (error) => {
        console.error('Si è verificato un errore durante l\'aggiunta del magazzino:', error);
        // Gestisci l'errore, ad esempio, mostra un messaggio di errore all'utente
        this.errorMessage = 'Errore durante l\'aggiunta del magazzino.';
        this.successMessage = null; // Assicurati che il messaggio di successo sia vuoto
      }
    );
  }
}
