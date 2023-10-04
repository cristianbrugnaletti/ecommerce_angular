import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdottoService } from '../prodotto.service'; // Importa il tuo servizio dei prodotti
import { ProdottoDTO } from '../prodottoDTO'; // Assicurati di importare il tipo ProdottoDTO
import { ModificaProdottoComponent } from './../modifica-prodotto/modifica-prodotto.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent implements OnInit {

  prodotti: ProdottoDTO[] = []; // Usa il tipo ProdottoDTO
  prodottoDaModificareIndex: number | null = null;
  nomeOriginale: string | null = null;
  @ViewChild(ModificaProdottoComponent) modificaProdottoComponent: ModificaProdottoComponent | undefined;
  searchForm: FormGroup;
  mostraFormRicerca = false;

  constructor
  (private prodottoService: ProdottoService,
   private toastr: ToastrService, 
   private formBuilder: FormBuilder) {
    this.nomeOriginale = null;  
    this.searchForm = this.formBuilder.group({
      nome: [''],
      marca: [''],
      descrizione: [''],
      prezzo: [null]
    });

   }

  ngOnInit() {
    this.trovaProdotti();
  }

  trovaProdotti() {
    // Chiamata al servizio per recuperare i dati dei prodotti
    this.prodottoService.getProdotti().subscribe(
      (data: ProdottoDTO[]) => { // Specifica il tipo di dati
        this.prodotti = data; // Assegna i dati dei prodotti all'array nel componente
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero dei prodotti:', error);
      }
    );
  }

  rimuoviProdotto(prodotto: ProdottoDTO) {
    if(prodotto.nome) {
    this.prodottoService.rimuoviProdotto(prodotto.nome)
      .subscribe(
        () => {
          // Rimozione avvenuta con successo, puoi gestire la risposta qui
          console.log('Prodotto rimosso con successo.');
          // Esegui eventuali azioni aggiuntive, come aggiornare l'elenco dei prodotti, ecc.
          const index = this.prodotti.indexOf(prodotto);
          if (index !== -1) {
            this.prodotti.splice(index, 1);
          }
        },
        (error) => {
          // Gestisci gli errori qui, ad esempio, mostrando un messaggio di errore all'utente
          console.error('Errore durante la rimozione del prodotto:', error);
        }
      );
    }
  }

  modificaProdotto(index: number) {
    if(this.prodottoDaModificareIndex === index) {
      this.prodottoDaModificareIndex = null;
      this.nomeOriginale = null;
    } else {
      this.prodottoDaModificareIndex = index;
      this.nomeOriginale = this.prodotti[index]?.nome || null; 
    }
  }

  confermaModifica(prodottoModificato: ProdottoDTO) {
    // Aggiorna l'array dei prodotti con il prodotto modificato
    if (this.prodottoDaModificareIndex !== null) {
      this.prodotti[this.prodottoDaModificareIndex] = prodottoModificato;
    }
  
    // Resetta le variabili per uscire dalla modalità di modifica
    this.prodottoDaModificareIndex = null;
    this.nomeOriginale = null;
  
    // Aggiorna l'elenco dei prodotti dopo la modifica
    this.trovaProdotti();
  }
  

  annullaModifica(index: number) {
    if (this.prodottoDaModificareIndex !== null && this.modificaProdottoComponent) {
      this.modificaProdottoComponent.annulla();
    }
    this.prodottoDaModificareIndex = null;
    this.nomeOriginale = null;
  }

  ricercaProdotto() {
    const criteria = this.searchForm.value;
    
    // Verifica che le chiavi siano presenti prima di effettuare la richiesta HTTP
    if ('nome' in criteria || 'descrizione' in criteria || 'prezzo' in criteria) {
      this.prodottoService.cercaProdotti(criteria.nome, criteria.descrizione, criteria.prezzo)
        .subscribe(
          (data: ProdottoDTO[]) => {
            this.prodotti = data;
          },
          (error) => {
            alert("Il prodotto che hai ricercato non esiste!");
            console.error('Si è verificato un errore durante la ricerca dei prodotti:', error);
          }
        );
    }
  }
  
  toggleRicerca() {
    this.mostraFormRicerca = !this.mostraFormRicerca;
    this.trovaProdotti();
    this.searchForm.reset();
  }

}
