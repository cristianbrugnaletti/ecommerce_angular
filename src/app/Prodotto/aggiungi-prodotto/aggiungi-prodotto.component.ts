import { Component } from '@angular/core';
import { ProdottoService } from '../prodotto.service';

@Component({
  selector: 'app-aggiungi-prodotto',
  templateUrl: './aggiungi-prodotto.component.html',
  styleUrls: ['./aggiungi-prodotto.component.css']
})
export class AggiungiProdottoComponent {
  fileToUpload: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isDragging: boolean = false;
  selectedFileName: string | null = null;

  constructor(private prodottoService: ProdottoService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedFileName = file.name;
    this.fileToUpload = file;
  }

  aggiungiProdottoDaExcel() {
    if (!this.fileToUpload) {
      this.mostraMessaggioErrore('Seleziona un file Excel prima di caricare il prodotto.');
      return;
    }

    this.prodottoService.importaProdottiDaExcel(this.fileToUpload).subscribe(
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

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileToUpload = files[0];
      this.selectedFileName = this.fileToUpload.name;
    }
  }
}