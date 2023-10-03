import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClienteService } from '../cliente/cliente.service';
import { ClienteDTO } from '../cliente/clienteDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.css']
})
export class ModificaClienteComponent {
  @Input() cliente: ClienteDTO | null = null;
  @Input() userOriginale: string | null = null;
  @Output() confermaModifica = new EventEmitter<ClienteDTO>();
  @Output() annullaModifica = new EventEmitter<void>();

  constructor(private clienteService: ClienteService, private toastr: ToastrService) { }

  salvaModifiche() {
    if (this.cliente && this.userOriginale) {
      this.clienteService.modificaCliente(this.userOriginale, this.cliente).subscribe(
        (clienteModificato: ClienteDTO) => {
          // Emetti l'evento confermaModifica con il magazzino modificato
          alert('Cliente modificato con successo!');
          this.confermaModifica.emit(clienteModificato);

        },
        (error) => {
          alert('Errore durante la modifica del cliente');
          console.error('Si è verificato un errore durante la modifica del cliente:', error);
        }
      );
    }
  }

  annulla() {
    this.annullaModifica.emit();
  }
}
