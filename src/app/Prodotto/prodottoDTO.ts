import { IVA } from "./IVA";

export class ProdottoDTO {
    id?: number;
    nome?: string;
    marca?: string;
    descrizione?: string;
    prezzo?: number;
    iva?: IVA; // Puoi definire un tipo specifico per IVA
    quantita?: number;

    sottoCategoria: string[]= [];

  }
  