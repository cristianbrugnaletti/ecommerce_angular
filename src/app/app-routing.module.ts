import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home-component.component';
import { FornitoriComponent } from './Fornitore/fornitori/fornitori-component.component';
import { AggiungiFornitoreComponent } from './Fornitore/aggiungi-fornitore/aggiungi-fornitore.component';
import { ClienteComponent } from './Cliente/cliente/cliente-component.component';
import { AggiungiClienteComponent } from './Cliente/aggiungi-cliente/aggiungi-cliente.component';
import { MagazziniComponent } from './Magazzino/magazzini/magazzini.component'; 
import { AggiungiMagazzinoComponent } from './Magazzino/aggiungi-magazzino/aggiungi-magazzino.component'; // Importa il componente

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'fornitori', component: FornitoriComponent },
  { path: 'aggiungi-fornitore', component: AggiungiFornitoreComponent },
  { path: 'clienti', component: ClienteComponent },
  { path: 'aggiungi-cliente', component: AggiungiClienteComponent },
  { path: 'magazzini', component: MagazziniComponent },
  { path: 'aggiungi-magazzino', component: AggiungiMagazzinoComponent }, // Aggiungi la route per il componente AggiungiMagazzinoComponent
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
