import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home-component.component';
import { FornitoriComponent } from './Fornitore/fornitori/fornitori-component.component';
import { AggiungiFornitoreComponent } from './Fornitore/aggiungi-fornitore/aggiungi-fornitore.component';
import { ClienteComponent } from './Cliente/cliente/cliente-component.component';
import { AggiungiClienteComponent } from './Cliente/aggiungi-cliente/aggiungi-cliente.component';
import { MenuComponent } from './home/menu/menu.component';
import { FornitoreService } from './Fornitore/fornitori/fornitore.service';
import { AppRoutingModule } from './app-routing.module';
import { MagazziniComponent } from './Magazzino/magazzini/magazzini.component';
import { AggiungiMagazzinoComponent } from './Magazzino/aggiungi-magazzino/aggiungi-magazzino.component';
import { ModificaMagazzinoComponent } from './Magazzino/modifica-magazzino/modifica-magazzino.component';
import { OrdineClienteComponent } from './OrdineCliente/ordine-cliente/ordine-cliente.component';
import { OrdineFornitoreComponent } from './OrdineFornitore/ordine-fornitore/ordine-fornitore.component';
import { ProdottiComponent } from './Prodotto/prodotti/prodotti.component';
import { AggiungiOrdineClienteComponent } from './OrdineCliente/aggiungi-ordine-cliente/aggiungi-ordine-cliente.component';
import { AggiungiOrdineFornitoreComponent } from './OrdineFornitore/aggiungi-ordine-fornitore/aggiungi-ordine-fornitore.component';
import { AggiungiProdottoComponent } from './Prodotto/aggiungi-prodotto/aggiungi-prodotto.component';
import { ProdottoService } from './Prodotto/prodotto.service';
import { ModificaFornitoreComponent } from './Fornitore/modifica-fornitore/modifica-fornitore.component';
import { EliminaFornitoreComponent } from './Fornitore/elimina-fornitore/elimina-fornitore.component';
import { EliminaMagazzinoComponent } from './Magazzino/elimina-magazzino/elimina-magazzino.component';
import { ModificaProdottoComponent } from './Prodotto/modifica-prodotto/modifica-prodotto.component';
import { AddProdottoComponent } from './Prodotto/add-prodotto/add-prodotto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModificaMagazzinoComponent,
    EliminaMagazzinoComponent,
    FornitoriComponent,
    AggiungiFornitoreComponent,
    ClienteComponent,
    AggiungiClienteComponent,
    MenuComponent,
    MagazziniComponent,
    AggiungiMagazzinoComponent,
    OrdineClienteComponent,
    OrdineFornitoreComponent,
    ProdottiComponent,
    AggiungiProdottoComponent,
    AggiungiOrdineClienteComponent,
    AggiungiOrdineFornitoreComponent,
    ModificaFornitoreComponent,
    EliminaFornitoreComponent,
    ModificaMagazzinoComponent,
    EliminaMagazzinoComponent,
    ModificaProdottoComponent,
    AddProdottoComponent
    
  ],
  providers: [FornitoreService, ProdottoService],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    ButtonModule,
    TieredMenuModule,
    PanelMenuModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      toastClass: 'toast-success' // Classe CSS personalizzata
    })
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
