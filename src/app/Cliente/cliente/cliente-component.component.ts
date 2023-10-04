import { Component } from '@angular/core';
import { ClienteDTO } from './clienteDTO';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente-component.component.html',
  styleUrls: ['./cliente-component.component.css']
})
export class ClienteComponent {
  
  clienti: ClienteDTO[] = []; // Assicurati che il tipo di dati corrisponda a ciò che restituisce il servizio
  clienteDaModificareIndex: number | null = null;
  userOriginale: string | null = null;
  clienteDaEliminareIndex: number | null = null;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.trovaClienti();
  }

  trovaClienti() {
    this.clienteService.getClienti().subscribe((data: ClienteDTO[]) => {
      this.clienti = data; // Assegna i dati ricevuti alla variabile fornitori
    });
  }

  eliminaCliente(username: string) {
    this.clienteService.eliminaCliente(username).subscribe((data: ClienteDTO) => {
      this.clienti = this.clienti.filter(c => c.username !== username);
      alert("Cliente eliminato con successo!");
    });
  }

  modificaCliente(index: number) {
    if (this.clienteDaModificareIndex === index) {
      // Se il form è già aperto e stai cliccando di nuovo su "Modifica",
      // chiudi il form settando il valore a null
      this.clienteDaModificareIndex = null;
      this.userOriginale = null;
    } else {
      this.clienteDaModificareIndex = index;
      this.userOriginale = this.clienti[index]?.username || null;
    }
  }

  confermaModifica(clienteModificato: ClienteDTO) {
    if (this.clienteDaModificareIndex !== null) {
      this.clienti[this.clienteDaModificareIndex] = clienteModificato;
    }

    this.clienteDaModificareIndex = null;
    this.userOriginale = null;
    this.trovaClienti();
  }

  annullaModifica() {
    this.clienteDaModificareIndex = null;
    this.userOriginale = null;
  }

  eliminazioneConfermata() {
    if (this.userOriginale && this.clienteDaEliminareIndex !== null) {
      this.userOriginale = null;
      this.clienteDaEliminareIndex = null;
      this.trovaClienti();
    }
  }

  annullaEliminazioneCliente() {
    this.clienteDaEliminareIndex = null;
    this.userOriginale = null;
  }
}
