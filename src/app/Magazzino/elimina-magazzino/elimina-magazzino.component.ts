import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MagazzinoService } from '../magazzino.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-elimina-magazzino',
  templateUrl: './elimina-magazzino.component.html',
  styleUrls: ['./elimina-magazzino.component.css']
})
export class EliminaMagazzinoComponent {
  @Input() nomeOriginale: string | null = null;
  @Output() eliminazioneConfermata = new EventEmitter<void>();
  @Output() eliminazioneAnnullata = new EventEmitter<void>();
  
  constructor(private magazzinoService: MagazzinoService, private toastr: ToastrService) {
  }

  eliminaMagazzino(): void {
    if (this.nomeOriginale) {
      this.magazzinoService.eliminaMagazzino(this.nomeOriginale).subscribe(
        () => {
          alert('Magazzino eliminato con successo!');
          this.eliminazioneConfermata.emit();
          
        },
        (error) => {
          console.error('Si è verificato un errore durante l\'eliminazione del magazzino:', error);
          alert('Errore durante l\'eliminazione del magazzino.');
        }
      );
    }
  }

  annullaEliminazione() {
    this.eliminazioneAnnullata.emit();
  }
}
