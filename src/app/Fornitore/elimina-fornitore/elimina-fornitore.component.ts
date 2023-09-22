import { Component, Input } from '@angular/core';
import { FornitoreDTO } from '../fornitori/fornitoreDTO';
import { FornitoreService } from '../fornitori/fornitore.service';

@Component({
  selector: 'app-elimina-fornitore',
  templateUrl: './elimina-fornitore.component.html',
  styleUrls: ['./elimina-fornitore.component.css']
})
export class EliminaFornitoreComponent {
  @Input() fornitore!: FornitoreDTO;

  constructor(private fornitoreService: FornitoreService) {}


  // Metodo per eliminare un fornitore
  eliminaFornitore() {
    if (this.fornitore && this.fornitore.id) {
      if (confirm('Sei sicuro di voler eliminare questo fornitore?')) {
        this.fornitoreService.eliminaFornitore(this.fornitore.id).subscribe(
          () => {
            // Eliminazione completata con successo
            console.log('Fornitore eliminato con successo');
            // Emetti un evento o esegui ulteriori azioni qui
          },
          (errore) => {
            // Gestisci eventuali errori qui
            console.error('Errore durante l\'eliminazione del fornitore:', errore);
            
          }
        );
      }
    } else {
      console.error('ID del fornitore non definito o fornitore non presente.');
    }
  }
  }
