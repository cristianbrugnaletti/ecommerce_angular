import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MagazzinoService } from '../magazzino.service';
import { MagazzinoDTO } from '../MagazzinoDTO';

@Component({
  selector: 'app-modifica-magazzino',
  templateUrl: './modifica-magazzino.component.html',
  styleUrls: ['./modifica-magazzino.component.css']
})
export class ModificaMagazzinoComponent {
  @Input() magazzino: MagazzinoDTO | null = null;
  @Input() nomeOriginale: string | null = null; // Input per il nome originale
  @Output() confermaModifica = new EventEmitter();
  @Output() annullaModifica = new EventEmitter();

  constructor(private magazzinoService: MagazzinoService) { }

  salvaModifiche() {
    if (this.magazzino && this.nomeOriginale) {
      // Effettua il salvataggio dei dati utilizzando this.nomeOriginale come necessario
      this.magazzinoService.modificaMagazzino(this.magazzino).subscribe(
        () => {
          this.confermaModifica.emit();
        },
        (error) => {
          console.error('Si è verificato un errore durante la modifica del magazzino:', error);
        }
      );
    }
  }

  annulla() {
    // Implementa la logica per annullare le modifiche
    this.annullaModifica.emit();
  }
}
