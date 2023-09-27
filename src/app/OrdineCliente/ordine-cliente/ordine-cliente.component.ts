import { Component, OnInit } from '@angular/core';
import { ClienteOrdineDTO } from '../clienteOrdineDTO';
import { ClienteOrdineService } from './cliente-ordine.service';

@Component({
  selector: 'app-ordine-cliente',
  templateUrl: './ordine-cliente.component.html',
  styleUrls: ['./ordine-cliente.component.css']
})
export class OrdineClienteComponent implements OnInit {

  ordiniCliente: ClienteOrdineDTO[] = [];

  constructor(private clienteOrdineService: ClienteOrdineService) { }

  ngOnInit(): void {
    this.caricaOrdiniCliente();
  }

  caricaOrdiniCliente() {
    this.clienteOrdineService.trovaOrdiniCliente().subscribe((data: ClienteOrdineDTO[]) => {
      this.ordiniCliente = data;
    });
  }

}


