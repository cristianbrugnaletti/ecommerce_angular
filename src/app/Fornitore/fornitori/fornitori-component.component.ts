import { Component, OnInit } from '@angular/core';
import { FornitoreService } from './fornitore.service';
import { FornitoreDTO } from './fornitoreDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fornitori',
  templateUrl: './fornitori-component.component.html',
  styleUrls: ['./fornitori-component.component.css']
})
export class FornitoriComponent implements OnInit {
  fornitoreInModifica: FornitoreDTO | null = null;
  modificaAperta: boolean = false;
  fornitori: FornitoreDTO[] = [];


  constructor(
    private fornitoreService: FornitoreService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.caricaFornitori();
  }

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
            console.log('Fornitore eliminato con successo');
            alert('Fornitore eliminato con successo');
            this.fornitori = this.fornitori.filter((f) => f.id !== fornitore.id);
          },
          (errore) => {
            alert('Non è possibile eliminare questo fornitore. Si è verificato un errore.');
            console.error('Errore durante l\'eliminazione del fornitore:', errore);
          }
        );
      } else {
        console.error('ID del fornitore non definito.');
      }
    }
  }

  modificaFornitore(fornitore: FornitoreDTO) {
    // Se il fornitore è già in modifica, chiudiamo il form
    if (this.fornitoreInModifica && this.fornitoreInModifica.id === fornitore.id) {
      this.fornitoreInModifica = null;
      this.modificaAperta = false;
    } else {
      // Altrimenti, avviamo la modifica del fornitore
      this.fornitoreInModifica = fornitore;
      this.modificaAperta = true;
    }
  }

  gestisciModificaCompletata() {
    this.fornitoreInModifica = null;
    this.modificaAperta = false;
    this.caricaFornitori();
    this.toastr.success('Fornitore modificato con successo!', 'Successo', {
      timeOut: 2000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      enableHtml: true,
      toastClass: 'custom-toast'
    });
  }

  avviaModifica(fornitore: FornitoreDTO): void {
    this.fornitoreInModifica = fornitore;
  }

  gestisciAnnullaModifica() {
    this.fornitoreInModifica = null;
    this.modificaAperta = false;
    this.caricaFornitori();
  }


}
