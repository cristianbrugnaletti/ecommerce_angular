import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClienteOrdineService } from '../ordine-cliente/cliente-ordine.service';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';

@Component({
  selector: 'app-elimina-ordine-cliente',
  templateUrl: './elimina-ordine-cliente.component.html',
  styleUrls: ['./elimina-ordine-cliente.component.css']
})
export class EliminaOrdineClienteComponent {
  @Input() clienteUsername: string | null = null;
  @Input() dataInvioOrdine: string | null = null;
  @Output() eliminazioneConfermata = new EventEmitter<void>();
  @Output() eliminazioneAnnullata = new EventEmitter<void>();

  constructor(private clienteOrdineService: ClienteOrdineService, private toastr: ToastrService) {}

  eliminaOrdineCliente(): void {
    if (this.clienteUsername && this.dataInvioOrdine) {
      this.clienteOrdineService.deleteOrdine(this.clienteUsername,this.dataInvioOrdine).subscribe(
        () => {
          this.toastr.success('Ordine eliminato con successo!', 'Successo');
          this.eliminazioneConfermata.emit();
        },
        (error: any) => {
          console.error('Si è verificato un errore durante l\'eliminazione dell\'ordine:', error);
          this.toastr.error('Errore durante l\'eliminazione dell\'ordine.', 'Errore');
        }
      );
    }
  }

  annullaEliminazione() {
    this.eliminazioneAnnullata.emit();
  }
}
