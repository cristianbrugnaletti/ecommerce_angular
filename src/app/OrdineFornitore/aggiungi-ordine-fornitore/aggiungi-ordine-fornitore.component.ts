import { Component, OnInit } from '@angular/core';
import { ProdottoService } from '../../Prodotto/prodotto.service';
import { ProdottoDTO } from '../../Prodotto/prodottoDTO';

@Component({
  selector: 'app-aggiungi-ordine-fornitore',
  templateUrl: './aggiungi-ordine-fornitore.component.html',
  styleUrls: ['./aggiungi-ordine-fornitore.component.css']
})
export class AggiungiOrdineFornitoreComponent implements OnInit {
  prodotti: ProdottoDTO[] = [];
  carrello: any[] = []; // Array per gestire il carrello
  rigaOrdineVisible = false;
  rigaOrdine = {
    nomeProdotto: '',
    quantita: 0
  };
  prezzoTotale = 0; // Aggiungi il campo per il prezzo totale

  constructor(private prodottoService: ProdottoService) { }

  ngOnInit() {
    // Chiamata al servizio per recuperare i dati dei prodotti
    this.prodottoService.getProdotti().subscribe(
      (data: ProdottoDTO[]) => {
        this.prodotti = data;
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero dei prodotti:', error);
      }
    );
  }

  // Funzione per aggiungere un prodotto al carrello
  aggiungiAlCarrello(prodotto: ProdottoDTO) {
    // Verifica se il prodotto è già nel carrello
    const index = this.carrello.findIndex(item => item.nomeProdotto === prodotto.nome);
  
    if (index !== -1) {
      // Se il prodotto è già nel carrello, aumenta la quantità
      this.carrello[index].quantita += 1;
    } else {
      // Altrimenti, aggiungi il prodotto al carrello con quantità 1
      this.carrello.push({
        nomeProdotto: prodotto.nome,
        quantita: 1
      });
    }
  
    // Verifica se il prezzo del prodotto è definito
    if (typeof prodotto.prezzo === 'number') {
      // Aggiorna il prezzo totale
      this.prezzoTotale += prodotto.prezzo;
    } else {
      console.error('Il prezzo del prodotto non è definito o non è un numero.');
    }
  
    // Mostra la riga d'ordine
    this.rigaOrdineVisible = true;
    this.rigaOrdine.nomeProdotto = prodotto.nome ?? '';
    this.rigaOrdine.quantita = 1; // Inizializza la quantità a 1
  }

  // Funzione per confermare l'ordine
  confermaOrdine() {
    // Implementa qui la logica per confermare l'ordine
    // Puoi inviare i dati della riga d'ordine al tuo backend o fare altre operazioni necessarie
    // Successivamente, puoi ripulire il carrello e nascondere la riga d'ordine
    this.carrello = [];
    this.rigaOrdineVisible = false;
    this.rigaOrdine.nomeProdotto = '';
    this.rigaOrdine.quantita = 0;
    this.prezzoTotale = 0; // Resetta il prezzo totale
  }
}