import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MagazzinoService } from '../magazzino.service';

@Component({
  selector: 'app-elimina-magazzino',
  templateUrl: './elimina-magazzino.component.html',
  styleUrls: ['./elimina-magazzino.component.css']
})
export class EliminaMagazzinoComponent {
  @Input() nomeMagazzino: string = '';
  @Output() eliminazioneConfermata = new EventEmitter();
  @Output() eliminazioneAnnullata = new EventEmitter();
  
  constructor(private magazzinoService: MagazzinoService) {
  }

  eliminaMagazzino(): void {
    this.magazzinoService.eliminaMagazzino(this.nomeMagazzino).subscribe(
      () => {
        this.eliminazioneConfermata.emit();
      },
      (error) => {
        console.error('Si è verificato un errore durante l\'eliminazione del magazzino:', error);
      }
    );
  }

  confermaEliminazione() {
    this.eliminaMagazzino();
  }

  annullaEliminazione() {
    this.eliminazioneAnnullata.emit();
  }
}