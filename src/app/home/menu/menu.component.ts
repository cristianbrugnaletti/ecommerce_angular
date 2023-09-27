import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FornitoreDTO } from 'src/app/Fornitore/fornitori/fornitoreDTO';
import { FornitoreService } from 'src/app/Fornitore/fornitori/fornitore.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  searchTerm: string = '';
  fornitori: FornitoreDTO[] = [];
  searchResults: FornitoreDTO[] = [];

  constructor(private router: Router, private fornitoreService: FornitoreService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.router.navigate(['/']);
        }
      },
      {
        label: 'Gestione Fornitori',
        icon: 'pi pi-fw pi-truck',
        items: [
          {
            label: 'Elenco Fornitori',
            icon: 'pi pi-fw pi-list',
            command: () => {
              this.router.navigate(['/fornitori']);
            }
          },
          {
            label: 'Aggiungi Fornitore',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/aggiungi-fornitore']);
            }
          }
        ]
      },
      {
        label: 'Gestione Magazzini',
        icon: 'pi pi-fw pi-building',
        items: [
          {
            label: 'Elenco Magazzini',
            icon: 'pi pi-fw pi-list',
            command: () => {
              this.router.navigate(['/magazzini']);
            }
          },
          {
            label: 'Aggiungi Magazzino',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/aggiungi-magazzino']);
            }
          }
        ]
      },
      {
        label: 'Gestione Clienti',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Elenco Clienti',
            icon: 'pi pi-fw pi-list',
            command: () => {
              this.router.navigate(['/clienti']);
            }
          },
          {
            label: 'Aggiungi Cliente',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/aggiungi-cliente']);
            }
          }
        ]
      },
      {
        label: 'Ordini Cliente',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Elenco Ordini Cliente',
            icon: 'pi pi-fw pi-list',
            command: () => {
              this.router.navigate(['/ordine-cliente']);
            }
          },
          {
            label: 'Nuovo Ordine Cliente',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/aggiungi-ordine-cliente']);
            }
          }
        ]
      },
      {
        label: 'Ordini Fornitore',
        icon: 'pi pi-fw pi-truck',
        items: [
          {
            label: 'Elenco Ordini Fornitore',
            icon: 'pi pi-fw pi-list',
            command: () => {
              this.router.navigate(['/ordine-fornitore']);
            }
          },
          {
            label: 'Nuovo Ordine Fornitore',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/aggiungi-ordine-fornitore']);
            }
          }
        ]
      },
      {
        label: 'Gestione Prodotti',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Elenco Prodotti',
            icon: 'pi pi-fw pi-list',
            command: () => {
              this.router.navigate(['/prodotti']);
            }
          },
          {
            label: 'Aggiungi Prodotto',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/aggiungi-prodotto']);
            }
          }
        ]
      }
    ];
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  ricercaFornitori() {
    // Chiama il metodo del servizio per ottenere i fornitori
    this.fornitoreService.getFornitori().subscribe(
      (fornitori: FornitoreDTO[]) => {
        // Filtra i fornitori in base a ciò che ha digitato l'utente
        this.searchResults = fornitori.filter((fornitore) => {
          return fornitore.nome?.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero dei fornitori:', error);
      }
    );
  }
}