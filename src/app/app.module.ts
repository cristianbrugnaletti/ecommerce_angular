import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home-component.component';
import { FornitoriComponent } from './Fornitore/fornitori/fornitori-component.component';
import { AggiungiFornitoreComponent } from './Fornitore/aggiungi-fornitore/aggiungi-fornitore.component';
import { ClienteComponent } from './Cliente/cliente/cliente-component.component';
import { AggiungiClienteComponent } from './Cliente/aggiungi-cliente/aggiungi-cliente.component';
import { ProdottiComponent } from './Prodotto/prodotti/prodotti-component.component';
import { AggiungiProdottoComponent } from './Prodotto/aggiungi-prodotto/aggiungi-prodotto.component';
import { MenuComponent } from './home/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FornitoriComponent,
    AggiungiFornitoreComponent,
    ClienteComponent,
    AggiungiClienteComponent,
    ProdottiComponent,
    AggiungiProdottoComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    ButtonModule,
    TieredMenuModule,
    PanelMenuModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }