import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MagazzinoService } from '../magazzino.service';
import { MagazzinoDTO } from '../MagazzinoDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-magazzini',
  templateUrl: './magazzini.component.html',
  styleUrls: ['./magazzini.component.css']
})
export class MagazziniComponent implements OnInit {
  magazzini: MagazzinoDTO[] = [];
  magazzinoDaModificareIndex: number | null = null;
  nomeOriginale: string | null = null;
  magazzinoDaEliminareIndex: number | null = null;
  mostraFormRicerca = false; // Aggiunto per gestire la visibilità del form di ricerca

  // Dichiarazione del form di ricerca
  searchForm: FormGroup;

  constructor(
    private magazzinoService: MagazzinoService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      nome: [''],
      indirizzo: [''],
      sede: [''],
      capacitaMassima: [null]
    });
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
    if (this.magazzinoDaModificareIndex === index) {
      // Se il form è già aperto e stai cliccando di nuovo su "Modifica",
      // chiudi il form settando il valore a null
      this.magazzinoDaModificareIndex = null;
      this.nomeOriginale = null;
    } else {
      this.magazzinoDaModificareIndex = index;
      this.nomeOriginale = this.magazzini[index]?.nome || null;
    }
  }

  confermaModifica(magazzinoModificato: MagazzinoDTO) {
    if (this.magazzinoDaModificareIndex !== null) {
      this.magazzini[this.magazzinoDaModificareIndex] = magazzinoModificato;
    }

    this.magazzinoDaModificareIndex = null;
    this.nomeOriginale = null;
    this.getMagazzini();
  }

  annullaModifica() {
    this.magazzinoDaModificareIndex = null;
    this.nomeOriginale = null;
  }

  eliminaMagazzino(nomeMagazzino: string | undefined, index: number) {
    if (nomeMagazzino) {
      this.nomeOriginale = nomeMagazzino;
      this.magazzinoDaEliminareIndex = index;
    }
  }

  eliminazioneConfermata() {
    if (this.nomeOriginale && this.magazzinoDaEliminareIndex !== null) {
      this.nomeOriginale = null;
      this.magazzinoDaEliminareIndex = null;
      this.getMagazzini();
    }
  }

  annullaEliminazioneMagazzino() {
    this.magazzinoDaEliminareIndex = null;
    this.nomeOriginale = null;
  }

  // Gestisci la logica di ricerca qui
  ricercaMagazzini() {
    const criteria = this.searchForm.value;
    // Esegui la tua ricerca utilizzando "criteria" come filtro
    // Chiamata al tuo servizio di ricerca con i criteri specificati
  }

  // Aggiunto metodo per gestire la visibilità del form di ricerca
  toggleRicerca() {
    this.mostraFormRicerca = !this.mostraFormRicerca;
  }
}
