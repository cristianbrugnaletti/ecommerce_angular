import { Component, OnInit } from '@angular/core';
import { ClienteOrdineService } from '../ordine-cliente/cliente-ordine.service';
import { ClienteRigaDOrdineRequest } from '../ordine-cliente/clienteRigaDOrdineRequest';
import { ClienteRigaDOrdineDTO } from '../ordine-cliente/clienteRigaDOrdineDTO';
import { ProdottoDTO } from 'src/app/Prodotto/prodottoDTO';
import { ProdottoService } from 'src/app/Prodotto/prodotto.service';
import { ClienteOrdineRequest } from '../clienteOrdineRequest';
import { ClienteOrdineDTO } from '../clienteOrdineDTO';
import { Router } from '@angular/router';


@Component({
  selector: 'app-aggiungi-ordine-cliente',
  templateUrl: './aggiungi-ordine-cliente.component.html',
  styleUrls: ['./aggiungi-ordine-cliente.component.css']
})
export class AggiungiOrdineClienteComponent implements OnInit {
  clienteRigaDOrdineRequest: ClienteRigaDOrdineRequest = new ClienteRigaDOrdineRequest();
  prodotti: ProdottoDTO[] = [];
  carrello: ProdottoDTO[] = [];
  prezzoTotaleOrdine: number = 0;
  ultimoOrdineId: number = 1;
  ordineEffettuato: ClienteOrdineDTO | null = null;
  mostraDettagliOrdine: boolean = false; 

  // Inizializza clienteOrdineRequest nel costruttore
  clienteOrdineRequest: ClienteOrdineRequest = new ClienteOrdineRequest();
  
  constructor(
    private clienteOrdineService: ClienteOrdineService,
    private prodottoService: ProdottoService,
    private router: Router 
  ) { }

 
  ngOnInit() {
    const carrelloInLocalStorage = localStorage.getItem('carrello');
  if (carrelloInLocalStorage) {
    this.carrello = JSON.parse(carrelloInLocalStorage);
    this.prezzoTotaleOrdine = this.calcolaPrezzoTotale();
  }

    
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
    // Chiamata a trovaOrdiniCliente per ottenere l'ultimo ordine cliente
    this.clienteOrdineService.trovaOrdiniCliente().subscribe(
      (ordini: ClienteOrdineDTO[]) => {
        if (ordini.length > 0) {
          // Trova l'ultimo ordine cliente
          const ultimoOrdine = ordini[ordini.length - 1];
          this.ultimoOrdineId = ultimoOrdine.clienteOrdineId;
  
          // Assicurati che clienteOrdineRequest.clienteOrdineId sia impostato
          if (this.clienteOrdineRequest && this.ultimoOrdineId) {
            // Assegna il valore corrente di ultimoOrdineId a clienteRigaDOrdineRequest.clienteOrdineId
            this.clienteRigaDOrdineRequest.clienteOrdineId = this.ultimoOrdineId;
            this.clienteOrdineRequest.usernameCliente = "toni"
  
            // Popoliamo il nomeProdotto con il nome del prodotto selezionato.
            this.clienteRigaDOrdineRequest.nomeProdotto = prodotto.nome; // Sostituisci con il valore corretto
  
            // Popoliamo la quantità con un valore appropriato, ad esempio:
            this.clienteRigaDOrdineRequest.quantita = 1; // Sostituisci con il valore corretto
  
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
          } else {
            console.error('ID dell\'ordine cliente non valido.');
          }
        } else {
          // Assicurati che clienteOrdineRequest.clienteOrdineId sia impostato
          if (this.clienteOrdineRequest && this.ultimoOrdineId) {
            // Assegna il valore corrente di ultimoOrdineId a clienteRigaDOrdineRequest.clienteOrdineId
            this.clienteRigaDOrdineRequest.clienteOrdineId = this.ultimoOrdineId;
            this.clienteOrdineRequest.usernameCliente = "toni"
  
            // Popoliamo il nomeProdotto con il nome del prodotto selezionato.
            this.clienteRigaDOrdineRequest.nomeProdotto = prodotto.nome; // Sostituisci con il valore corretto
  
            // Popoliamo la quantità con un valore appropriato, ad esempio:
            this.clienteRigaDOrdineRequest.quantita = 1; // Sostituisci con il valore corretto
  
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
          } else {
            console.error('ID dell\'ordine cliente non valido.');
          }
        }
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero degli ordini cliente:', error);
      }
    );
  }
  

  aggiungiAlCarrello(prodotto: ProdottoDTO) {
    this.carrello.push(prodotto);
    this.prezzoTotaleOrdine = this.calcolaPrezzoTotale();
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
  }

  confermaOrdine() {
    this.clienteOrdineService.trovaOrdiniCliente().subscribe(
      (ordini: ClienteOrdineDTO[]) => {
        if (ordini.length > 0) {
          // Trova l'ultimo ordine cliente
          const ultimoOrdine = ordini[ordini.length - 1];
          this.ultimoOrdineId = ultimoOrdine.clienteOrdineId;
          this.clienteOrdineRequest.clienteOrdineId = this.ultimoOrdineId;
          this.ultimoOrdineId += 1;
          // Ora che hai l'ID, puoi effettuare la chiamata a confermaOrdineCliente
          this.clienteOrdineService.confermaOrdineCliente(this.clienteOrdineRequest)
            .subscribe(
              (ordine: ClienteOrdineDTO) => {
                // Assegna il prezzo totale dalla risposta alla variabile prezzoTotaleOrdine
                this.prezzoTotaleOrdine = ordine.prezzoTotale;
                // Imposta l'ordine effettuato
                this.ordineEffettuato = ordine;
                console.log('Ordine confermato con successo:', ordine);
                this.mostraDettagliOrdine = true;
                this.svuotaCarrello();
                localStorage.removeItem('carrello')
              },
              (error) => {
                // Gestisci gli errori qui, ad esempio, mostrando un messaggio di errore all'utente
                console.error('Errore durante la conferma dell\'ordine:', error);
                alert("Errore durante la conferma dell'ordine");
              }
            );
        } else {
          // Se non ci sono ordini precedenti, inizia con l'ID 1
          this.ultimoOrdineId = 1;
          // Esegui la chiamata a confermaOrdineCliente qui se necessario
        }
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero degli ordini cliente:', error);
      }
    );
  }
  
  calcolaPrezzoTotale(): number {
    let prezzoTotale = 0;
    for (const prodotto of this.carrello) {
      prezzoTotale += prodotto.prezzo ? prodotto.prezzo : 0;
    }
    return prezzoTotale;
  }

  rimuoviProdottoDalCarrello(prodotto: ProdottoDTO) {
    const index = this.carrello.indexOf(prodotto);
    if (index >= 0) {
      this.carrello.splice(index, 1);
      this.prezzoTotaleOrdine = this.calcolaPrezzoTotale();
    }
  }

  svuotaCarrello() {
    this.carrello = [];
    this.prezzoTotaleOrdine = 0;
  }

  tornaAllaListaOrdini() {
    this.router.navigate(['/ordine-cliente']); // Sostituisci con il percorso corretto per la lista degli ordini
  }
  
  creaNuovoOrdine() {
    this.mostraDettagliOrdine = false;
    this.ordineEffettuato = new ClienteOrdineDTO();
    // Recupera l'ultimo ordine cliente per impostare il valore iniziale di clienteOrdineId
    this.clienteOrdineService.trovaOrdiniCliente().subscribe(
      (ordini: ClienteOrdineDTO[]) => {
        if (ordini.length > 0) {
          // Trova l'ultimo ordine cliente
          const ultimoOrdine = ordini[ordini.length - 1];
          // Imposta il valore di ultimoOrdineId con l'ID dell'ultimo ordine incrementato di uno
          this.ultimoOrdineId = ultimoOrdine.clienteOrdineId + 1;
        } else {
          // Se non ci sono ordini precedenti, inizia con l'ID 1
          this.ultimoOrdineId = 1;
        }
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero degli ordini cliente:', error);
      }
    );
  }
  
  
}

