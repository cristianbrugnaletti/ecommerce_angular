import { IVA } from "./IVA";

export class ProdottoRequest {
    
    nome?: string;
    marca?: string;
    descrizione?: string;
    prezzo?: number;
    iva?: number; // Puoi definire un tipo specifico per IVA
    quantita?: number;
    id_fornitore?: number;
    id_sottoCategoria: number[]= [];

  }
  