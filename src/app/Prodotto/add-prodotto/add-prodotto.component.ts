import { Component } from '@angular/core';
import { ProdottoService } from '../prodotto.service';
import { ProdottoDTO } from '../prodottoDTO';

@Component({
  selector: 'app-add-prodotto',
  templateUrl: './add-prodotto.component.html',
  styleUrls: ['./add-prodotto.component.css']
})
export class AddProdottoComponent {
  nuovoProdotto: ProdottoDTO = new ProdottoDTO(); // Inizializza un nuovo oggetto ProdottoDTO vuoto

  constructor(private prodottoService: ProdottoService) { }

  aggiungiProdotto() {
    this.prodottoService.aggiungiProdotto(this.nuovoProdotto)
      .subscribe(
        (prodottoAggiunto) => {
          // Prodotto aggiunto con successo, puoi gestire la risposta qui
          console.log('Prodotto aggiunto con successo:', prodottoAggiunto);
          // Esegui eventuali azioni aggiuntive, come aggiornare l'elenco dei prodotti, ecc.
        },
        (error) => {
          // Gestisci gli errori qui, ad esempio, mostrando un messaggio di errore all'utente
          console.error('Errore durante l aggiunta del prodotto:', error);
        }
      );
  }
}
