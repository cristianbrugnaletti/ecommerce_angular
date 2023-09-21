import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home-component.component';
import { FornitoriComponent } from './Fornitore/fornitori/fornitori-component.component';
import { AggiungiFornitoreComponent } from './Fornitore/aggiungi-fornitore/aggiungi-fornitore.component';
import { ClienteComponent } from './Cliente/cliente/cliente-component.component';
import { AggiungiClienteComponent } from './Cliente/aggiungi-cliente/aggiungi-cliente.component';
import { MagazziniComponent } from './Magazzino/magazzini/magazzini.component'; 
import { AggiungiMagazzinoComponent } from './Magazzino/aggiungi-magazzino/aggiungi-magazzino.component'; 
import { OrdineClienteComponent } from './OrdineCliente/ordine-cliente/ordine-cliente.component'; // Importa il componente OrdineClienteComponent
import { OrdineFornitoreComponent } from './OrdineFornitore/ordine-fornitore/ordine-fornitore.component'; // Importa il componente OrdineFornitoreComponent

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'fornitori', component: FornitoriComponent },
  { path: 'aggiungi-fornitore', component: AggiungiFornitoreComponent },
  { path: 'clienti', component: ClienteComponent },
  { path: 'aggiungi-cliente', component: AggiungiClienteComponent },
  { path: 'magazzini', component: MagazziniComponent },
  { path: 'aggiungi-magazzino', component: AggiungiMagazzinoComponent },
  { path: 'ordine-cliente', component: OrdineClienteComponent }, // Aggiungi la route per il componente OrdineClienteComponent
  { path: 'ordine-fornitore', component: OrdineFornitoreComponent }, // Aggiungi la route per il componente OrdineFornitoreComponent
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}