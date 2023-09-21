import { Component } from '@angular/core';
import { ProdottoService } from '../prodotto.service';

@Component({
  selector: 'app-aggiungi-prodotto',
  templateUrl: './aggiungi-prodotto.component.html',
  styleUrls: ['./aggiungi-prodotto.component.css']
})
export class AggiungiProdottoComponent {
  fileDaCaricare: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private prodottoService: ProdottoService) {}

  onFileChange(event: any) {
    this.fileDaCaricare = event.target.files[0];
  }

  aggiungiProdottoDaExcel() {
    if (!this.fileDaCaricare) {
      this.errorMessage = 'Seleziona un file Excel prima di caricare il prodotto.';
      this.successMessage = null; // Resetta il messaggio di successo in caso di errore
      return;
    }

    this.prodottoService.importaProdottiDaExcel(this.fileDaCaricare).subscribe(
      (response: any) => {
        console.log('Risposta del server:', response);
        if (response.message === 'Prodotti importati con successo da Excel.') {
          this.successMessage = 'Prodotti importati con successo da Excel.';
          this.errorMessage = null; // Resetta il messaggio di errore in caso di successo
        } else {
          console.error('Risposta del server sconosciuta:', response);
          this.errorMessage = 'Errore durante l\'importazione del prodotto da Excel.';
          this.successMessage = null; // Resetta il messaggio di successo in caso di errore
        }
      },
      (error) => {
        console.error('Si è verificato un errore durante l\'importazione del prodotto da Excel:', error);
        this.errorMessage = 'Errore durante l\'importazione del prodotto da Excel.';
        this.successMessage = null; // Resetta il messaggio di successo in caso di errore
      }
    );
  }
}
