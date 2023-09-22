import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FornitoreDTO } from '../fornitori/fornitoreDTO';
import { FornitoreService } from '../fornitori/fornitore.service';
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute e Router

@Component({
  selector: 'app-modifica-fornitore',
  templateUrl: './modifica-fornitore.component.html',
  styleUrls: ['./modifica-fornitore.component.css']
})
export class ModificaFornitoreComponent {
  @Input() fornitore: FornitoreDTO;
  @Output() modificaCompletata = new EventEmitter<void>();
  erroreModifica: string = '';
  
  partitaIVA: string = '';
  
  constructor(
    private fornitoreService: FornitoreService,
    private router: Router, // Inietta il servizio Router
    private route: ActivatedRoute // Inietta ActivatedRoute nel costruttore
  ) {
    this.fornitore = {} as FornitoreDTO;
    this.partitaIVA = '';
    this.route.params.subscribe(params => {
      this.partitaIVA = params['partitaIVA']; // Utilizza 'partitaIVA' invece di 'id'
    });
  }

  confermaModifica(event: Event) {
    event.preventDefault(); // Impedisce il comportamento predefinito del form
  
    if (this.fornitore && this.fornitore.partitaIVA) {
      this.erroreModifica = ''; // Resetta eventuali errori precedenti
      console.log('Dati da inviare nella richiesta PUT:', this.fornitore);
      this.fornitoreService.modificaFornitore(this.fornitore.partitaIVA, this.fornitore).subscribe(
        () => {
          // La modifica è completata con successo
          this.modificaCompletata.emit(); // Prima emetti l'evento
          this.router.navigate(['/home']); // Poi esegui il reindirizzamento
        },
        (errore) => {
          // Gestisci eventuali errori qui e mostra un messaggio di errore all'utente
          this.erroreModifica = 'Si è verificato un errore durante la modifica del fornitore.';
          console.error('Errore durante la modifica del fornitore:', errore);
        }
      );
    } else {
      this.erroreModifica = 'Partita IVA non definita.';
    }
  }
}