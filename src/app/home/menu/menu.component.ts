import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Fornitore',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Elenco Fornitori',
            icon: 'pi pi-fw pi-list'
          },
          {
            label: 'Aggiungi Fornitore',
            icon: 'pi pi-fw pi-plus'
          }
        ]
      },
      {
        label: 'Prodotto',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Elenco Prodotti',
            icon: 'pi pi-fw pi-list'
          },
          {
            label: 'Aggiungi Prodotto',
            icon: 'pi pi-fw pi-plus'
          }
        ]
      },
      {
        label: 'Cliente',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Elenco Clienti',
            icon: 'pi pi-fw pi-list'
          },
          {
            label: 'Aggiungi Cliente',
            icon: 'pi pi-fw pi-plus'
          }
        ]
      }
      // Puoi aggiungere altre voci del menu qui
    ];
  }
}