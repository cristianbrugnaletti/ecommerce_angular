import { Component, OnInit } from '@angular/core';
import { FornitoreService } from './fornitore.service';
import { FornitoreDTO } from './fornitoreDTO'; // Assicurati di importare il DTO corretto

@Component({
  selector: 'app-fornitori',
  templateUrl: './fornitori-component.component.html',
  styleUrls: ['./fornitori-component.component.css']
})
export class FornitoriComponent implements OnInit {
  fornitori: FornitoreDTO[] = []; // Assicurati che il tipo di dati corrisponda a ciò che restituisce il servizio

  constructor(private fornitoreService: FornitoreService) { }

  ngOnInit() {
    this.fornitoreService.getFornitori().subscribe((data: FornitoreDTO[]) => {
      this.fornitori = data; // Assegna i dati ricevuti alla variabile fornitori
    });
  }
}