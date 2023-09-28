import { Component } from '@angular/core';
import { MagazzinoDTO } from '../MagazzinoDTO';
import { MagazzinoService } from '../magazzino.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aggiungi-magazzino',
  templateUrl: './aggiungi-magazzino.component.html',
  styleUrls: ['./aggiungi-magazzino.component.css'],
})
export class AggiungiMagazzinoComponent {
  magazzino: MagazzinoDTO = new MagazzinoDTO();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  aggiungiNuovoMagazzino: boolean = false;

  constructor(
    private magazzinoService: MagazzinoService,
    private router: Router
  ) {}

  aggiungiMagazzino() {
    this.magazzinoService.aggiungiMagazzino(this.magazzino).subscribe(
      (response: any) => {
        console.log('Risposta del server:', response);
        if (response.message) {
          this.successMessage = response.message;
          this.errorMessage = null;
          this.aggiungiNuovoMagazzino = true;
        } else {
          console.error('Risposta del server sconosciuta:', response);
        }
      },
      (error) => {
        console.error('Si è verificato un errore durante l\'aggiunta del magazzino:', error);
        this.errorMessage = 'Errore durante l\'aggiunta del magazzino.';
        this.successMessage = null;
      }
    );
  }

  aggiungiAltroMagazzino() {
    this.aggiungiNuovoMagazzino = false;
    this.successMessage = null;
    this.magazzino = new MagazzinoDTO();
  }

  tornaAListaMagazzini() {
    // Reindirizza l'utente a MagazziniComponent
    this.router.navigate(['/magazzini']);
  }
}
