import { Component, OnInit } from '@angular/core';
import { ClienteOrdineDTO } from '../clienteOrdineDTO';
import { ClienteOrdineService } from './cliente-ordine.service';

@Component({
  selector: 'app-ordine-cliente',
  templateUrl: './ordine-cliente.component.html',
  styleUrls: ['./ordine-cliente.component.css']
})
export class OrdineClienteComponent implements OnInit {

  ordiniCliente: ClienteOrdineDTO[] = [];
  ordineInEliminazione: ClienteOrdineDTO | null = null;

  constructor(private clienteOrdineService: ClienteOrdineService) { }

  ngOnInit(): void {
    this.caricaOrdiniCliente();
  }

  caricaOrdiniCliente() {
    this.clienteOrdineService.trovaOrdiniCliente().subscribe((data: ClienteOrdineDTO[]) => {
      this.ordiniCliente = data;
    });
  }

  avviaEliminazione(ordine: ClienteOrdineDTO) {
    if (ordine !== this.ordineInEliminazione) {
      this.ordineInEliminazione = ordine;
    } else {
      this.annullaEliminazione();
    }
  }

  confermaEliminazione() {
    if (this.ordineInEliminazione) {
      // Chiamata al servizio per confermare l'eliminazione dell'ordine cliente
      // Gestione dell'eliminazione completata
      this.caricaOrdiniCliente(); // Aggiorna la lista degli ordini cliente
      this.ordineInEliminazione = null; // Resetta la variabile di stato
    }
  }

  annullaEliminazione() {
    // Annulla l'eliminazione e resetta la variabile di stato
    this.ordineInEliminazione = null;
  }
}
