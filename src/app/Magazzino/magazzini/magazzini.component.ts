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
  eliminazioneAttiva: boolean = false;

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

    alert('Magazzino modificato con successo!');

    this.getMagazzini();
  }

  annullaModifica() {
    this.magazzinoDaModificareIndex = null;
    this.nomeOriginale = null;
  }


  eliminaMagazzino(nomeMagazzino: string | undefined) {
    if (nomeMagazzino) {
      this.nomeOriginale = nomeMagazzino;
      this.eliminazioneAttiva = true; // Attiva l'eliminazione
    }
  }

  eliminazioneConfermata() {
          this.nomeOriginale = null;
          this.eliminazioneAttiva = false; // Disattiva l'eliminazione
          alert('Magazzino eliminato con successo!');
          this.getMagazzini();
  }
  
  annullaEliminazioneMagazzino() {
    this.magazzinoDaEliminareIndex = null;
    this.nomeOriginale = null;
    this.eliminazioneAttiva = false; // Disattiva l'eliminazione
  }
}