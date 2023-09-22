import { Component, OnInit } from '@angular/core';
import { FornitoreService } from './fornitore.service';
import { FornitoreDTO } from './fornitoreDTO';

@Component({
  selector: 'app-fornitori',
  templateUrl: './fornitori-component.component.html',
  styleUrls: ['./fornitori-component.component.css']
})
export class FornitoriComponent implements OnInit {

  fornitoreInModifica: FornitoreDTO | null = null;


  fornitori: FornitoreDTO[] = [];

  constructor(private fornitoreService: FornitoreService) { }

  ngOnInit() {
    this.caricaFornitori();
  }

  // Metodo per caricare i fornitori dal servizio
  caricaFornitori() {
    this.fornitoreService.getFornitori().subscribe((data: FornitoreDTO[]) => {
      this.fornitori = data;
    });
  }

// Metodo per eliminare un fornitore
eliminaFornitore(fornitore: FornitoreDTO) {
  // Verifica se la proprietà id è definita prima di eliminarla
  if (fornitore.id !== undefined) {
    // Chiamata al servizio per eliminare il fornitore
    this.fornitoreService.eliminaFornitore(fornitore.id).subscribe(() => {
      // Rimuovi il fornitore dalla lista dopo l'eliminazione
      this.fornitori = this.fornitori.filter(f => f !== fornitore);
      console.log('Fornitore eliminato con successo.');
    });
  } else {
    console.error('ID del fornitore non definito.');
  }
}


 // Funzione per avviare la modifica di un fornitore
 modificaFornitore(fornitore: FornitoreDTO) {
  this.fornitoreInModifica = fornitore;
}



annullaModifica() {
  // Puoi inserire qui la logica per annullare la modifica
  this.fornitoreInModifica = null; // Imposta il fornitoreInModifica su null o a un valore appropriato
}


avviaModifica(fornitore: FornitoreDTO): void {
  // Copia il fornitore in una nuova variabile per evitare modifiche dirette
  const fornitoreInModifica = { ...fornitore };

  // Assegna il fornitore copiato alla variabile fornitoreInModifica
  this.fornitoreInModifica = fornitoreInModifica;
}
}