import { Component } from '@angular/core';
import { MagazzinoDTO } from '../../MagazzinoDTO';
import { MagazzinoService } from '../../magazzino.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule per ngModel

@Component({
  selector: 'app-aggiungi-magazzino',
  templateUrl: './aggiungi-magazzino.component.html',
  styleUrls: ['./aggiungi-magazzino.component.css'],
})
export class AggiungiMagazzinoComponent {
  magazzino: MagazzinoDTO = new MagazzinoDTO();

  constructor(private magazzinoService: MagazzinoService) {}

  aggiungiMagazzino() {
    this.magazzinoService.aggiungiMagazzino(this.magazzino).subscribe(
      (response) => {
        // Gestisci la risposta dal backend, ad esempio, mostra un messaggio di successo o reindirizza l'utente
      },
      (error) => {
        console.error('Si è verificato un errore durante l\'aggiunta del magazzino:', error);
        // Gestisci l'errore, ad esempio, mostra un messaggio di errore all'utente
      }
    );
  }
}
