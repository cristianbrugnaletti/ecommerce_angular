import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ProdottoService } from '../prodotto.service'; // Importa il tuo servizio dei prodotti
import { ProdottoDTO } from '../prodottoDTO'; // Assicurati di importare il tipo ProdottoDTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modifica-prodotto',
  templateUrl: './modifica-prodotto.component.html',
  styleUrls: ['./modifica-prodotto.component.css']
})
export class ModificaProdottoComponent  {
  @Input() prodotto: ProdottoDTO | null = null;
  @Input() nomeOriginale: string | null = null; 
  @Output() confermaModifica = new EventEmitter<ProdottoDTO>();
  @Output() annullaModifica = new EventEmitter<void>();
  prodottoForm!: FormGroup;
  submitted = false;
 
  constructor(
    private prodottoService: ProdottoService,
    private formBuilder: FormBuilder // Iniezione del FormBuilder
  ) { }

  ngOnInit() {
    // Inizializzazione del form nel metodo ngOnInit
    this.prodottoForm = this.formBuilder.group({
        nome: [this.prodotto?.nome, [Validators.required]], // Aggiungi le validazioni necessarie
        marca: [this.prodotto?.marca, []], // Aggiungi le validazioni necessarie
        descrizione: [this.prodotto?.descrizione, []], // Aggiungi le validazioni necessarie
        prezzo: [this.prodotto?.prezzo, [Validators.required, Validators.min(1)]], // Aggiungi le validazioni necessarie
        partitaIva: [this.prodotto?.iva, []], // Aggiungi le validazioni necessarie
        quantita: [this.prodotto?.quantita, [Validators.required, Validators.min(1)]], // Aggiungi le validazioni necessarie
    });
  }

  salvaModifiche() {
    this.submitted = true; // Imposta submitted su true quando il modulo viene inviato

    if (this.prodottoForm && this.prodotto && this.nomeOriginale) {
      if (this.prodottoForm.valid) {
        this.prodottoService.modificaProdotto(this.nomeOriginale, this.prodotto).subscribe(
          (prodottoModificato: ProdottoDTO) => {
            this.confermaModifica.emit(prodottoModificato);
          },
          (error) => {
            console.error('Si è verificato un errore durante la modifica del prodotto:', error);
          }
        );
      }
    }
  }


  annulla() {
    this.annullaModifica.emit();
    window.location.href = '/prodotti';
  }
}