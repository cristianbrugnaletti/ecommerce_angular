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
      this.mostraMessaggioErrore('Seleziona un file Excel prima di caricare il prodotto.');
      return;
    }

    this.prodottoService.importaProdottiDaExcel(this.fileDaCaricare).subscribe(
      (response: any) => {
        console.log('Risposta del server:', response);
        if (typeof response === 'string') {
          this.mostraMessaggioSuccesso('Operazione completata con successo.');
        } else {
          console.error('Risposta del server sconosciuta:', response);
          this.mostraMessaggioErrore('Errore durante l\'operazione.');
        }
      },
      (error) => {
        console.error('Si è verificato un errore durante l\'operazione:', error);
        this.mostraMessaggioErrore('Errore durante l\'operazione.');
      }
    );
  }

  // Metodo per mostrare un messaggio di successo
  mostraMessaggioSuccesso(messaggio: string) {
    this.successMessage = messaggio;
    this.errorMessage = null;
  }

  // Metodo per mostrare un messaggio di errore
  mostraMessaggioErrore(messaggio: string) {
    this.errorMessage = messaggio;
    this.successMessage = null;
  }
}
