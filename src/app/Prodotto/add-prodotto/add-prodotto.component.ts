import { Component } from '@angular/core';
import { ProdottoService } from '../prodotto.service';
import { ProdottoDTO } from '../prodottoDTO';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'; 
import { Validators, AbstractControl } from '@angular/forms';
import { ProdottoRequest } from '../prodottoRequest';

@Component({
  selector: 'app-add-prodotto',
  templateUrl: './add-prodotto.component.html',
  styleUrls: ['./add-prodotto.component.css']
})
export class AddProdottoComponent {

  nuovoProdotto: ProdottoRequest = new ProdottoRequest(); 
  successMessage: string | null = null;
  errorMessage: string | null = null;
  prodottoForm: FormGroup;

  constructor(
    private prodottoService: ProdottoService, 
    private router: Router,
    private formBuilder: FormBuilder 
    ) {
      this.prodottoForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        marca: ['', [Validators.required]],
        descrizione: ['', [Validators.required, Validators.minLength(5)]],
        prezzo: ['', [Validators.required ]],
        iva: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11) ]],
        quantita: ['', [Validators.required, Validators.pattern(/^\d+$/) ]],
        idFornitore: ['', [Validators.required]],
        id_sottoCategoria: [ [Validators.required]],
      });
    }

    aggiungiProdotto() {
      if (this.prodottoForm.valid) {
        // Il form è valido, procedi con l'invio dei dati al server
        const nuovoProdotto = this.prodottoForm.value; // Ottieni i dati dal form
        console.log(nuovoProdotto)
        this.prodottoService.aggiungiProdotto(nuovoProdotto)
          .subscribe(
            (prodottoAggiunto) => {
              // Prodotto aggiunto con successo, puoi gestire la risposta qui
              console.log('Prodotto aggiunto con successo:', prodottoAggiunto);
              // Esegui eventuali azioni aggiuntive, come aggiornare l'elenco dei prodotti, ecc.
              // Potresti anche reimpostare il form o navigare altrove se necessario
              this.prodottoForm.reset(); // Resetta il form dopo l'aggiunta
            },
            (error) => {
              // Gestisci gli errori qui, ad esempio, mostrando un messaggio di errore all'utente
              console.error('Errore durante l aggiunta del prodotto:', error);
            }
          );
      } else {
        // Il form non è valido, mostra un messaggio di errore o gestisci in base alle tue esigenze
        console.log('Il form non è valido. Controlla i campi.');
      }
    }
    
}
