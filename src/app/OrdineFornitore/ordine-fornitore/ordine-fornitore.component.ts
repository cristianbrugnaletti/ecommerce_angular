import { Component } from '@angular/core';
import { FornitoreOrdineDTO } from '../fornitoreOrdineDTO';
import { FornitoreService } from 'src/app/Fornitore/fornitori/fornitore.service';

@Component({
  selector: 'app-ordine-fornitore',
  templateUrl: './ordine-fornitore.component.html',
  styleUrls: ['./ordine-fornitore.component.css']
})
export class OrdineFornitoreComponent {

  ordiniFornitore: FornitoreOrdineDTO[] = [];

  constructor(private fornitoreService: FornitoreService) { }
  
  ngOnInit(): void {
    this.trovaOrdiniFornitore();
  }

  trovaOrdiniFornitore() {
    this.fornitoreService.caricaFornitoreOrdine().subscribe((data: FornitoreOrdineDTO[]) => {
      this.ordiniFornitore = data;
      console.log(this.ordiniFornitore);
    });
  }
}
