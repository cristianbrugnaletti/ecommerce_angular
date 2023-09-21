export class ProdottoDTO {
    id?: number;
    nome?: string;
    marca?: string;
    descrizione?: string;
    prezzo?: number;
    iva?: string; // Puoi definire un tipo specifico per IVA
    quantita?: number;
    sottoCategoria?: string[];
  }
  