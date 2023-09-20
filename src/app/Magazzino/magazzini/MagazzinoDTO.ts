export class MagazzinoDTO {
  nome: string;
  indirizzo: string;
  sede: string;
  capacitaMassima: number;

  constructor(nome: string, indirizzo: string, sede: string, capacitaMassima: number) {
    this.nome = nome;
    this.indirizzo = indirizzo;
    this.sede = sede;
    this.capacitaMassima = capacitaMassima;
  }
}
