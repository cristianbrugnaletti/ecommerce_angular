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
  @Input() nomeOriginale: string | null = null;
  @Output() confermaModifica = new EventEmitter<MagazzinoDTO>();
  @Output() annullaModifica = new EventEmitter<void>();

  constructor(private magazzinoService: MagazzinoService) { }

  salvaModifiche() {
    if (this.magazzino && this.nomeOriginale) {
      this.magazzinoService.modificaMagazzino(this.nomeOriginale, this.magazzino).subscribe(
        (magazzinoModificato: MagazzinoDTO) => {
          // Emetti l'evento confermaModifica con il magazzino modificato
          this.confermaModifica.emit(magazzinoModificato);
        },
        (error) => {
          console.error('Si è verificato un errore durante la modifica del magazzino:', error);
        }
      );
    }
  }

  annulla() {
    this.annullaModifica.emit();
  }
}