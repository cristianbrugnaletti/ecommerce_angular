import { Component, OnInit } from '@angular/core';
import { MagazzinoService } from '../../magazzino.service';
import { MagazzinoDTO } from '../../MagazzinoDTO'; // Assicurati di importare il tipo MagazzinoDTO

@Component({
  selector: 'app-magazzini',
  templateUrl: './magazzini.component.html',
  styleUrls: ['./magazzini.component.css']
})
export class MagazziniComponent implements OnInit {
  magazzini: MagazzinoDTO[] = []; // Usa il tipo MagazzinoDTO

  constructor(private magazzinoService: MagazzinoService) { }

  ngOnInit() {
    // Chiamata al servizio per recuperare i dati dei magazzini
    this.magazzinoService.getMagazzini().subscribe(
      (data: MagazzinoDTO[]) => { // Specifica il tipo di dati
        this.magazzini = data; // Assegna i dati dei magazzini all'array nel componente
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero dei magazzini:', error);
      }
    );
  }
}
