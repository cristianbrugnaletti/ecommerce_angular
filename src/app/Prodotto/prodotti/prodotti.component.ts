import { Component, OnInit } from '@angular/core';
import { ProdottoService } from '../prodotto.service'; // Importa il tuo servizio dei prodotti
import { ProdottoDTO } from '../prodottoDTO'; // Assicurati di importare il tipo ProdottoDTO

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent implements OnInit {
  prodotti: ProdottoDTO[] = []; // Usa il tipo ProdottoDTO

  constructor(private prodottoService: ProdottoService) { }

  ngOnInit() {
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
}
