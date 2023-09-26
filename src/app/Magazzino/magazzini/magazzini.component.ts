import { Component, OnInit } from '@angular/core';
import { MagazzinoService } from '../magazzino.service';
import { MagazzinoDTO } from '../MagazzinoDTO';

@Component({
  selector: 'app-magazzini',
  templateUrl: './magazzini.component.html',
  styleUrls: ['./magazzini.component.css']
})
export class MagazziniComponent implements OnInit {
  magazzini: MagazzinoDTO[] = [];
  magazzioDaModificare: number | null = null;
  nomeOriginale: string | null = null;

  constructor(private magazzinoService: MagazzinoService) { }

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
    this.magazzioDaModificare = index;
    this.nomeOriginale = this.magazzini[index].nome ?? null; 
  }
}
