import { Component } from '@angular/core';
import { ClienteOrdineService } from '../ordine-cliente/cliente-ordine.service';
import { ClienteRigaDOrdineRequest } from '../ordine-cliente/clienteRigaDOrdineRequest';
import { ClienteRigaDOrdineDTO } from '../ordine-cliente/clienteRigaDOrdineDTO';
import { ProdottoDTO } from 'src/app/Prodotto/prodottoDTO';
import { ProdottoService } from 'src/app/Prodotto/prodotto.service';
import { ClienteOrdineRequest } from '../clienteOrdineRequest';
import { ClienteOrdineDTO } from '../clienteOrdineDTO';

@Component({
  selector: 'app-aggiungi-ordine-cliente',
  templateUrl: './aggiungi-ordine-cliente.component.html',
  styleUrls: ['./aggiungi-ordine-cliente.component.css']
})
export class AggiungiOrdineClienteComponent {
  clienteRigaDOrdineRequest: ClienteRigaDOrdineRequest = new ClienteRigaDOrdineRequest();
  prodotti: ProdottoDTO[] = [];
  carrello: ProdottoDTO[] = [];

  constructor(private clienteOrdineService: ClienteOrdineService, private prodottoService: ProdottoService) { }

  ngOnInit() {
    this.prodottoService.getProdotti().subscribe(
      (data: ProdottoDTO[]) => {
        this.prodotti = data;
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero dei prodotti:', error);
      }
    );
  }

  aggiungiRigaDOrdine(prodotto: ProdottoDTO) {
    // Prima di effettuare la chiamata, assicuriamoci che this.clienteRigaDOrdineRequest abbia tutti i dati richiesti.
    
    // Popoliamo il clienteOrdineId con un valore appropriato, ad esempio:
    this.clienteRigaDOrdineRequest.clienteOrdineId = 123; // Sostituisci con il valore corretto
    
    // Popoliamo il nomeProdotto con il nome del prodotto selezionato.
    this.clienteRigaDOrdineRequest.nomeProdotto = prodotto.nome; // Sostituisci con il valore corretto
  
    // Popoliamo la quantità con un valore appropriato, ad esempio:
    this.clienteRigaDOrdineRequest.quantita = 20; // Sostituisci con il valore corretto
  
    this.clienteOrdineService.aggiungiClienteRigaDOrdine(this.clienteRigaDOrdineRequest)
      .subscribe(
        (response: ClienteRigaDOrdineDTO) => {
          // Gestisci la risposta qui, ad esempio, aggiornando l'interfaccia utente o effettuando altre azioni necessarie
          console.log('Riga d\'ordine aggiunta con successo:', response);
  
          // Aggiungi il prodotto al carrello
          this.aggiungiAlCarrello(prodotto);
        },
        (error) => {
          // Gestisci gli errori qui, ad esempio, mostrando un messaggio di errore all'utente
          console.error('Errore durante l\'aggiunta della riga d\'ordine:', error);
        }
      );
  }  

  aggiungiAlCarrello(prodotto: ProdottoDTO) {
    this.carrello.push(prodotto);
  }
  
  confermaOrdine() {
    const clienteOrdineRequest: ClienteOrdineRequest = {
      clienteOrdineId: 1,
      usernameCliente: 'leorm02',
     
    };
  
    this.clienteOrdineService.confermaOrdineCliente(clienteOrdineRequest)
      .subscribe(
        (response: ClienteOrdineDTO) => {
          // Gestisci la risposta qui, ad esempio, aggiornando l'interfaccia utente o effettuando altre azioni necessarie
          console.log('Ordine confermato con successo:', response);
        },
        (error) => {
          // Gestisci gli errori qui, ad esempio, mostrando un messaggio di errore all'utente
          console.error('Errore durante la conferma dell\'ordine:', error);
        }
      );
    }
  } 