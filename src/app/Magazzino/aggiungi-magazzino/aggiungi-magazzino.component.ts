import { Component } from '@angular/core';
import { MagazzinoDTO } from '../MagazzinoDTO';
import { MagazzinoService } from '../magazzino.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-aggiungi-magazzino',
  templateUrl: './aggiungi-magazzino.component.html',
  styleUrls: ['./aggiungi-magazzino.component.css'],
})
export class AggiungiMagazzinoComponent {
  magazzino: MagazzinoDTO = new MagazzinoDTO();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  magazzinoForm: FormGroup;

  constructor(
    private magazzinoService: MagazzinoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.magazzinoForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      indirizzo: ['', [Validators.required]],
      sede: ['', [Validators.required]],
      capacitaMassima: ['', [Validators.required, Validators.min(1)]],
    });
  }

  aggiungiMagazzino() {
    if (this.magazzinoForm.valid) {
      // Il form è valido, procedi con l'invio dei dati al server
      this.magazzino = this.magazzinoForm.value; // Ottieni i dati dal form
      this.magazzinoService.aggiungiMagazzino(this.magazzino).subscribe(
        (response: any) => {
          console.log('Risposta del server:', response);
          if (response.message) {
            alert("Magazzino aggiunto con successo!")
            this.router.navigate(['/magazzini']);
          } else {
            alert("Errore durante l'aggiunta del magazzino!")
            console.error('Risposta del server sconosciuta:', response);
          }
        },
        (error) => {
          alert("Errore durante l'aggiunta del magazzino!")
          console.error('Si è verificato un errore durante l\'aggiunta del magazzino:', error);
    
        }
      );
    } else {
      alert("Form invalido compliare correttamente i campi!")
      console.log('Il form non è valido. Controlla i campi.');
    }
  }
}
