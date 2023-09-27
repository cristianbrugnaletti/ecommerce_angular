import { FornitoreDTO } from "../Fornitore/fornitori/fornitoreDTO";

export class FornitoreOrdineDTO {
    prezzoTotale: number = 0;
    dataInvioOrdine?: string;
    fornitore?: FornitoreDTO;
}