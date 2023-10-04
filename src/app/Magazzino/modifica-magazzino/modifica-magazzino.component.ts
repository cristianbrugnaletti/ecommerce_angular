import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa Validators
import { MagazzinoService } from '../magazzino.service';
import { MagazzinoDTO } from '../MagazzinoDTO';
import { ToastrService } from 'ngx-toastr';

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
  

  // Aggiungi il FormGroup per il form di modifica
  magazzinoForm: FormGroup;

  constructor(private magazzinoService: MagazzinoService, private toastr: ToastrService, private formBuilder: FormBuilder) {
    // Inizializza il FormGroup con le regole di validazione
    this.magazzinoForm = this.formBuilder.group({
      nome: ['', Validators.minLength(3)],
      indirizzo: ['', Validators.required],
      sede: ['', Validators.required],
      capacitaMassima: [null, [Validators.required, Validators.min(1)]]
    });
  }

  salvaModifiche() {
    if (this.magazzino && this.nomeOriginale ) {
      // Verifica se il form è valido prima di procedere
      if (this.magazzinoForm.valid) {
        this.magazzinoService.modificaMagazzino(this.nomeOriginale, this.magazzino).subscribe(
          (magazzinoModificato: MagazzinoDTO) => {
            // Emetti l'evento confermaModifica con il magazzino modificato
            this.toastr.success('Magazzino modificato con successo!', 'Successo');
            this.confermaModifica.emit(magazzinoModificato);
          },
          (error) => {
            this.toastr.error('Errore durante la modifica del magazzino', 'Errore');
            console.error('Si è verificato un errore durante la modifica del magazzino:', error);
          }
        );
      } else {
        // Se il form non è valido, visualizza un messaggio di errore
        this.toastr.error('Si prega di compilare correttamente tutti i campi obbligatori.', 'Errore');
      }
    }
  }

  annulla() {
    this.annullaModifica.emit();
  }
}
