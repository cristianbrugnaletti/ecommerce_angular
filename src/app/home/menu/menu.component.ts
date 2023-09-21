import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Fornitore',
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
        label: 'Magazzino',
        icon: 'pi pi-building',
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
        label: 'Cliente',
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
            icon: 'pi pi-fw pi-plus'
          }
        ]
      },
      {
        label: 'Ordini',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Ordine Cliente',
            icon: 'pi pi-fw pi-user',
            command: () => {
              this.router.navigate(['/ordine-cliente']);
            }
          },
          {
            label: 'Ordine Fornitore',
            icon: 'pi pi-fw pi-truck',
            command: () => {
              this.router.navigate(['/ordine-fornitore']);
            }
          }
        ]
      }
    ];
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}