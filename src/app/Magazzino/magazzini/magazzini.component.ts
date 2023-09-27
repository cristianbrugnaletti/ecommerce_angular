import { Component, OnInit, ViewChild } from '@angular/core';
import { MagazzinoService } from '../magazzino.service';
import { MagazzinoDTO } from '../MagazzinoDTO';
import { ModificaMagazzinoComponent } from '../modifica-magazzino/modifica-magazzino.component';
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService

@Component({
  selector: 'app-magazzini',
  templateUrl: './magazzini.component.html',
  styleUrls: ['./magazzini.component.css']
})
export class MagazziniComponent implements OnInit {
  magazzini: MagazzinoDTO[] = [];
  magazzinoDaModificareIndex: number | null = null;
  nomeOriginale: string | null = null;

  @ViewChild(ModificaMagazzinoComponent) modificaMagazzinoComponent: ModificaMagazzinoComponent | undefined;

  constructor(private magazzinoService: MagazzinoService, private toastr: ToastrService) {
    // Inizializza nomeOriginale come null nel costruttore
    this.nomeOriginale = null;
  }

  ngOnInit() {
    this.getMagazzini();
  }

  getMagazzini() {
    this.magazzinoService.getMagazzini().subscribe(
      (data: MagazzinoDTO[]) => {
        this.magazzini = data;
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero dei magazzini:', error);
      }
    );
  }

  modificaMagazzino(index: number) {
    this.magazzinoDaModificareIndex = index;
    // Assegna il nome originale qui
    this.nomeOriginale = this.magazzini[index]?.nome || null; 
  }

  confermaModifica(magazzinoModificato: MagazzinoDTO) {
    // Aggiorna l'elenco dei magazzini con il magazzino modificato
    if (this.magazzinoDaModificareIndex !== null) {
      this.magazzini[this.magazzinoDaModificareIndex] = magazzinoModificato;
    }

    // Resetta le variabili per uscire dalla modalità di modifica
    this.magazzinoDaModificareIndex = null;
    this.nomeOriginale = null;

    // Mostra una notifica popup di successo
    this.toastr.success('Magazzino modificato con successo!', 'Successo');

    this.getMagazzini();
  }

  annullaModifica(index: number) {
    if (this.magazzinoDaModificareIndex !== null && this.modificaMagazzinoComponent) {
      this.modificaMagazzinoComponent.annulla();
    }
    this.magazzinoDaModificareIndex = null;
    this.nomeOriginale = null;
  }
}
