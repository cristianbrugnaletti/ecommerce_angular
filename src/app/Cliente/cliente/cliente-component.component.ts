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

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClienti().subscribe((data: ClienteDTO[]) => {
      this.clienti = data; // Assegna i dati ricevuti alla variabile fornitori
    });
  }
}
