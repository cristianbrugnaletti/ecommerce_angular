import { Component, OnInit } from '@angular/core';
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


  constructor(private magazzinoService: MagazzinoService, private toastr: ToastrService) {}

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
    this.nomeOriginale = this.magazzini[index]?.nome || null;
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
  
  annullaEliminazioneMagazzino() {
    this.magazzinoDaEliminareIndex = null;
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
}