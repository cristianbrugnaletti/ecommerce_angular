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
  @Output() annullaModificaEvento: EventEmitter<void> = new EventEmitter<void>();
  
  erroreModifica: string = '';
  partitaIVA: string = '';
  fornitoreInModifica: FornitoreDTO | null = null;
  partitaIVAOld: string = ''; 
  errorMessage: string | null = null;
  telefonoInvalid = false;
  
  emailInvalid = false;

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
  modificaAperta: boolean = true;
  confermaModifica(event: Event) {

    event.preventDefault();



    if (!this.isEmailValid()) {
      this.emailInvalid = true;
      return;
    }
 
  
    if (!this.isTelefonoValid()) {
      this.emailInvalid = true;
      return;
    }


  

if (this.fornitore && this.fornitore.email) {
  // Espressione regolare per verificare il formato dell'email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
  
  // Verifica se l'email segue il formato corretto
  this.emailInvalid = !emailRegex.test(this.fornitore.email) || !this.fornitore.email.includes('@') || this.fornitore.email.split('@')[0].length === 0 || this.fornitore.email.split('@')[1].length === 0;
} else {
  this.emailInvalid = true;  // Email mancante
}

 // Esegui la validazione del numero di telefono e della Partita IVA
 if (this.fornitore && this.fornitore.numeroTelefono) {
  this.telefonoInvalid = !/^[0-9]*$/.test(this.fornitore.numeroTelefono) || this.fornitore.numeroTelefono.length < 10 || this.fornitore.numeroTelefono.length > 15;
} else {
  this.telefonoInvalid = true;
}







    if (this.fornitore && this.fornitore.id) {
      
      this.erroreModifica = '';
      this.modificaInCorso = true;

      this.fornitoreService.modificaFornitore(this.fornitore.id, this.fornitore).subscribe(
        () => {

          this.modificaInCorso = false;
          console.log('Reindirizzamento a /fornitori');
          this.modificaCompletata.emit();
          console.log('Partita IVA:', this.fornitore.partitaIVA);
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

  annullaModifica(event: Event) {
    event.preventDefault();
    this.modificaAperta = false;
    this.annullaModificaEvento.emit(); // Aggiungi questa linea per notificare che l'annullamento è stato completato
  }

  isEmailValid(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return this.fornitore.email ? emailRegex.test(this.fornitore.email) : false;
  }
  lunghezzaMassima = 20;

  isNomeValid(): boolean {
    const nome = this.fornitore.nome;
    if (!nome || nome.length === 0 || nome.length > this.lunghezzaMassima) {
      return false;
    }

    // Aggiungi altre condizioni se necessario, ad esempio controlli sul formato

    return /^[a-zA-Z]+$/.test(nome);  // Esempio: solo lettere
  }

  isTelefonoValid(): boolean {
    const telefonoRegex = /^[0-9]+$/; // Espressione regolare per accettare solo numeri
    const telefono = this.fornitore.numeroTelefono;
    const lunghezzaMassima = 15; // Imposta la lunghezza massima consentita per il numero di telefono
    const lunghezzaMinima = 8;
    // Verifica se il telefono è valido
    return telefono !== undefined && telefono !== null && telefonoRegex.test(telefono) && telefono.length <= lunghezzaMassima && telefono.length >= lunghezzaMinima;
  }

}
