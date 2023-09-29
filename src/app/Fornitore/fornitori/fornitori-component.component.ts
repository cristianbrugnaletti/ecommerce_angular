import { Component, OnInit } from '@angular/core';
import { FornitoreService } from './fornitore.service';
import { FornitoreDTO } from './fornitoreDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-fornitori',
  templateUrl: './fornitori-component.component.html',
  styleUrls: ['./fornitori-component.component.css']
})
export class FornitoriComponent implements OnInit {

  fornitoreInModifica: FornitoreDTO | null = null;
  
  // Inietta il servizio Router
  
  fornitori: FornitoreDTO[] = [];

  constructor(private fornitoreService: FornitoreService,
    private router: Router,private toastr: ToastrService
    ) { }

 

  ngOnInit() {
    this.caricaFornitori();
  }

  // Metodo per caricare i fornitori dal servizio
  caricaFornitori() {
    this.fornitoreService.getFornitori().subscribe((data: FornitoreDTO[]) => {
      this.fornitori = data;
    });
  }

  eliminaFornitore(fornitore: FornitoreDTO) {
    if (confirm('Sei sicuro di voler eliminare questo fornitore?')) {
      if (fornitore.id) {
        this.fornitoreService.eliminaFornitore(fornitore.id).subscribe(
          () => {
            // Eliminazione completata con successo
            console.log('Fornitore eliminato con successo');
            alert('Fornitore eliminato con successo');
            // Ora puoi rimuovere il fornitore dalla lista locale
            this.fornitori = this.fornitori.filter((f) => f.id !== fornitore.id);

            // Emetti un evento o esegui ulteriori azioni qui
          },
          (errore) => {
            // Gestisci eventuali errori qui
            alert('Non è possibile eliminare questo fornitore. Si è verificato un errore.');
            console.error('Errore durante l\'eliminazione del fornitore:', errore);
          }
        );
      } else {
        console.error('ID del fornitore non definito.');
      }
    }
  }


  // Funzione per avviare la modifica di un fornitore
  modificaFornitore(fornitore: FornitoreDTO) {
    this.fornitoreInModifica = fornitore;
  }

  // Funzione per gestire la modifica completata
  gestisciModificaCompletata() {
    // Qui puoi eseguire il reindirizzamento alla pagina dei fornitori
    this.fornitoreInModifica = null; // Imposta il fornitoreInModifica su null
    this.caricaFornitori();
    // Mostra una notifica popup di successo
    this.toastr.success('Fornitore modificato con successo!', 'Successo', {
      timeOut: 2000, // Durata del toast in millisecondi
      
      progressBar: true, // Barra di progresso
      positionClass: 'toast-bottom-right', // Posizione del toast
      enableHtml: true, // Abilita HTML nel messaggio
      toastClass: 'custom-toast' // Classe CSS personalizzata per il toast
    });
     // Assicurati che la rotta sia configurata correttamente
  }





  avviaModifica(fornitore: FornitoreDTO): void {
    this.fornitoreInModifica = fornitore;
  }

gestisciAnnullaModifica() {
  this.fornitoreInModifica = null; // Imposta il fornitoreInModifica su null
  this.caricaFornitori(); // Ricarica l'elenco dei fornitori
}

    }