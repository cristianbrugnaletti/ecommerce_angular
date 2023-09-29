import { ClienteDTO } from './ordine-cliente/ClienteDTO'; // Assumi che UtenteDTO sia nel tuo stesso percorso

export class ClienteOrdineDTO {
  dataInvioOrdine?: string;
  cliente?: ClienteDTO;
  prezzoTotale: number = 0;
  clienteOrdineId: number = 0;
  prodotti: string[] = []; 
}
