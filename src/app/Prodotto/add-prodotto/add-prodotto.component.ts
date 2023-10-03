import { Component } from '@angular/core';
import { ProdottoService } from '../prodotto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      prezzo: ['', [Validators.required]],
      iva: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      quantita: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      id_fornitore: ['', [Validators.required]],
      id_sottoCategoria: [[Validators.required]],
    });
  }

  aggiungiProdotto() {
    if (this.prodottoForm.valid) {
      this.nuovoProdotto = this.prodottoForm.value as ProdottoRequest; // Ottieni i dati dal form
      console.log('Dati del form:', this.nuovoProdotto);
  
      // Assicura che id_sottoCategoria sia un array anche se è un solo valore
      if (!Array.isArray(this.nuovoProdotto.id_sottoCategoria)) {
        this.nuovoProdotto.id_sottoCategoria = [this.nuovoProdotto.id_sottoCategoria];
      }
  
      console.log('Prodotto da aggiungere:', this.nuovoProdotto);
  
      // Aggiungi il prodotto
      this.prodottoService.aggiungiProdotto(this.nuovoProdotto).subscribe(
        (prodottoAggiunto) => {
          console.log('Prodotto aggiunto con successo:', prodottoAggiunto);
          this.successMessage = 'Prodotto aggiunto con successo!';
          this.prodottoForm.reset();
        },
        (error) => {
          console.error('Errore durante l\'aggiunta del prodotto:', error);
        }
      );
    } else {
      console.log('Il form non è valido. Controlla i campi.');
    }
  }
}
