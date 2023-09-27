import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FornitoreDTO } from '../fornitori/fornitoreDTO';
import { FornitoreService } from '../fornitori/fornitore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifica-fornitore',
  templateUrl: './modifica-fornitore.component.html',
  styleUrls: ['./modifica-fornitore.component.css']
})
export class ModificaFornitoreComponent {
  @Input() fornitore: FornitoreDTO;
  @Output() modificaCompletata: EventEmitter<void> = new EventEmitter<void>();

  erroreModifica: string = '';
  partitaIVA: string = '';
  fornitoreInModifica: FornitoreDTO | null = null;
  constructor(
    private fornitoreService: FornitoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fornitore = {} as FornitoreDTO;
    this.partitaIVA = '';
    this.route.params.subscribe(params => {
      this.partitaIVA = params['partitaIVA'];
    });
  }

  inModifica: boolean = true;
  modificaInCorso: boolean = false;

  confermaModifica(event: Event) {
    event.preventDefault();

    if (this.fornitore && this.fornitore.partitaIVA) {
      this.erroreModifica = '';
      this.modificaInCorso = true;

      this.fornitoreService.modificaFornitore(this.fornitore.partitaIVA, this.fornitore).subscribe(
        () => {
          this.modificaInCorso = false;
          console.log('Reindirizzamento a /fornitori');
          this.modificaCompletata.emit();
          this.router.navigate(['/fornitori']);
        },
        (errore) => {
          this.erroreModifica = 'Si è verificato un errore durante la modifica del fornitore.';
          console.error('Errore durante la modifica del fornitore:', errore);
          this.modificaInCorso = false;
        }
      );
    } else {
      this.erroreModifica = 'Partita IVA non definita.';
    }
  }

  annullaModifica() {
   
    window.location.href = '/fornitori';
    console.log('Reindirizzamento a /fornitori');
  }
}
