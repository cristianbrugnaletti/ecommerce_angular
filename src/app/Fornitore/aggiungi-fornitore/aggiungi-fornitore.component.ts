import { Component } from '@angular/core';
import { FornitoreService } from '../fornitori/fornitore.service';
import { FornitoreDTO } from '../fornitori/fornitoreDTO';
import { Message } from 'primeng/api'; // Assicurati di importare 'Message' da primeng

@Component({
  selector: 'app-aggiungi-fornitore',
  templateUrl: './aggiungi-fornitore.component.html',
  styleUrls: ['./aggiungi-fornitore.component.css'],
})


export class AggiungiFornitoreComponent{
  fornitore: FornitoreDTO = new FornitoreDTO();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  telefonoInvalid = false;
  partitaIVAInvalid = false;
  emailInvalid = false;

  suggerite: string[] = [];



  constructor(private fornitoreService: FornitoreService) {}

  selectedCountry: any = null;

  nations = [
    { name: 'Italia', code: 'ITALIA' },
    { name: 'Francia', code: 'FRANCIA' },
    { name: 'Germania', code: 'GERMANIA' },
    { name: 'Spagna', code: 'SPAGNA' },
    { name: 'Regno Unito', code: 'REGNO UNITO' },
    { name: 'Stati Uniti', code: 'STATI UNITI' },
    { name: 'Giappone', code: 'GIAPPONE' },
    { name: 'Cina', code: 'CINA' },
    { name: 'Canada', code: 'CANADA' },
    { name: 'Australia', code: 'AUSTRALIA' },
  ];

 



  aggiungiFornitore() {


    if (!this.selectedCountry) {
      this.errorMessage = 'Seleziona una nazione per la sede.';
      return;
    }
  
    this.fornitore.nazioneSede = this.selectedCountry.code;
 // Esegui la validazione del numero di telefono e della Partita IVA
 if (this.fornitore && this.fornitore.numeroTelefono) {
  this.telefonoInvalid = !/^[0-9]*$/.test(this.fornitore.numeroTelefono) || this.fornitore.numeroTelefono.length < 10 || this.fornitore.numeroTelefono.length > 15;
} else {
  this.telefonoInvalid = true;
}

if (this.fornitore && this.fornitore.partitaIVA) {
  this.partitaIVAInvalid = !/^[0-9]*$/.test(this.fornitore.partitaIVA) || this.fornitore.partitaIVA.length !== 11;
} else {
  this.partitaIVAInvalid = true;
}

if (this.fornitore && this.fornitore.email) {
  // Espressione regolare per verificare il formato dell'email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
  
  // Verifica se l'email segue il formato corretto
  this.emailInvalid = !emailRegex.test(this.fornitore.email) || !this.fornitore.email.includes('@') || this.fornitore.email.split('@')[0].length === 0 || this.fornitore.email.split('@')[1].length === 0;
} else {
  this.emailInvalid = true;  // Email mancante
}

// Se la validazione fallisce, puoi gestire l'errore o mostrare un messaggio all'utente
if (this.telefonoInvalid || this.partitaIVAInvalid) {
  // Gestisci l'errore o mostra un messaggio all'utente
  this.errorMessage = 'Si è verificato un errore di validazione. Controlla i campi inseriti.';
  return;
}


    this.fornitoreService.aggiungiFornitore(this.fornitore).subscribe(
      (response) => {
        // Gestisci la risposta dal backend, ad esempio, mostra un messaggio di successo o reindirizza l'utente
        if (response && response.message) {
          this.successMessage = response.message;
          this.errorMessage = null;
        } else {
          console.error('Risposta del server sconosciuta:', response);
        }
      },
      (error) => {
        console.error('Si è verificato un errore durante l\'aggiunta del fornitore:', error);
        // Gestisci l'errore, ad esempio, mostra un messaggio di errore all'utente
        this.errorMessage = 'Si è verificato un errore durante l\'aggiunta del fornitore.';
        this.successMessage = null;
      }
    );
  }

  isEmailValid(): boolean {
    if (!this.fornitore.email) {
      return false; // L'email è undefined, quindi non è valida
    }
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return emailRegex.test(this.fornitore.email) && this.fornitore.email.includes('@');
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




}